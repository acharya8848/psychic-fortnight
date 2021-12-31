import React, { useState } from 'react';
import './css/App.css';
import fire from './fire.js';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import Home from './components/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  const signOut = () => {
    fire.auth().signOut()
  }; 

  console.log('logged in?', isLoggedIn);

  return (
    <div className="App">
      <h1>Psychic Fortnight</h1>

      <Router>
        {!isLoggedIn
          ? (
            <>
              <Routes>
                <Route path="/" element={<Login/>}>
                </Route>
              </Routes>
            </>
          ) 
          : (
            <>
              <h1><p>Welcome!</p></h1>
              <span onClick={signOut}>
                <a href="/">Sign out</a>
              </span>
              <Routes>
                <Route path="/profile/" element={<Profile/>}>
                  Profile
                </Route>
                <Route path="/" element={<Home/>}>
                </Route>
              </Routes>
            </>
          )}
      </Router>
    </div>
  );
}

export default App;
