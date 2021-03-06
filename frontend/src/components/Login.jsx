import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fire from './../fire.js';

function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.error('Incorrect username or password');
                alert("incorrect username or password");
            });
    }
    return (
        <div>    
        <h2 className="words">
            Please Sign In or &nbsp;
            <button className="btn btn-success">
                <Link className="clean" to="/new-user/">
                    Create Account
                </Link>
            </button>
        </h2>
            
            <form onSubmit={handleSubmit} className="form-inline signin">
                <input
                    type="text"
                    className="form-control"
                    onChange={({ target }) =>     
                      setEmail(target.value)}
                    placeholder="Email"
                />
                <br />
                <input
                    type="password"
                    className="form-control"
                    onChange={({ target}) => 
                      setPassword(target.value)}
                    placeholder="Password"
                />
                <br />
                <button type="submit" className="btn btn-primary active">
                    Sign in
                </button>
            </form>
        </div>
    )
};

export default Login;