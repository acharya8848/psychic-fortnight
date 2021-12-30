import React, { useState } from 'react';
import './css/App.css';
import fire from './fire.js';
import Login from './components/Login.jsx';
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
            </>
          )}
      </Router>
    </div>
  );
}

export default App;
