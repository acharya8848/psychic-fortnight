import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createNewProfile } from '../services/profileServices.js';
import { useNavigate } from 'react-router-dom';

function NewUser() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const createNewUser = (e) => {
        e.preventDefault();
        if (firstName && lastName && email && password) {
            alert("profile successfully created");
            navigate("/");
            return createNewProfile(firstName, lastName, email, password);
        }
        else {
            alert("you must fill out all fields");
        }
    }

    return(
        <div>
            <h3 className="clean">Create New Profile</h3>

            <form onSubmit={createNewUser} className="form-inline signin">
                <input
                    type="text"
                    className="form-control"
                    onChange={({ target }) =>     
                      setFirstName(target.value)}
                    placeholder="First Name"
                />
                <br />
                <input
                    type="text"
                    className="form-control"
                    onChange={({ target}) => 
                      setLastName(target.value)}
                    placeholder="Last Name"
                />
                <br />
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
                        Create Profile
                </button>
            </form>
            <br/>
            <button className="btn btn-danger">
                <Link className="clean" to="/">
                    Back
                </Link>
            </button>
        </div>
    );
}

export default NewUser;