import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import fire from './fire.js';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import Home from './components/Home.jsx';
import NewUser from './components/NewUser.jsx';
import Particles from 'react-tsparticles';
import "bootstrap/dist/css/bootstrap.css";


function App() {
  //particles effect
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowParticles(true);
    }, 500);
  }, []);
  //end particles effect

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
      <h1 className="words">Psychic Fortnight</h1>
    
      <Router>
        {!isLoggedIn
          ? (
            <>
              <Routes>
                <Route path="/" element={<Login/>}>
                </Route>
                <Route path="/new-user/" element={<NewUser/>}>
                </Route>
              </Routes>
            </>
          ) 
          : (
            <> 
              <button className="btn btn-success active" href="/">
                <a className="clean" href="/">Home</a>
              </button>
              <button className="btn btn-info active" href="/profile/">
                <a className="clean" href="/profile/">Profile</a>
              </button>
              <button onClick={signOut} className="btn btn-danger active">
                <a className="clean" href="/">Sign out</a>
              </button>      
              <Routes>
                <Route path="/profile/" element={<Profile/>}>
                </Route>
                <Route path="/" element={<Home/>}>
                </Route>
              </Routes>
            </>
          )}
      </Router>
            


      {showParticles && (
        <Particles
          className="particles"
          height="95%"
          width="95%"
          params={{
            particles: {
              number: {
                value: 120,
                density: { enable: true, value_area: 700 },
              },
              color: { value: "#8465eb" },
              shape: {
                type: "circle",
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 },
                image: { src: "img/github.svg", width: 100, height: 100 },
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 5,
                random: true,
                anim: { enable: false, speed: 80, size_min: 0.1, sync: false },
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#79fce5",
                opacity: 0.3,
                width: 2,
              },
              move: {
                enable: true,
                speed: 4,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "bubble" },
                resize: true,
              },
              modes: {
                grab: { distance: 400, line_linked: { opacity: 1 } },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3,
                },
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
              },
            },
            retina_detect: true,
          }}
        />
      )}
    </div>
  );
}

export default App;
