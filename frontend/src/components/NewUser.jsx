import React, { useState } from 'react';
import fire from './../fire.js';

function NewUser() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const createNewUser = (e) => {
        e.preventDefault();
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
                    type="password"
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
            
        </div>
    );
}

export default NewUser;