import React, { useState, useEffect } from 'react';

function Profile() {
    //getting data from backend... (profile data as JSON)
    const [profileData, setProfileData] = useState(null);
     
    useEffect(() => {
        fetch("/api")
          .then((res) => res.json())
          .then((profileData) => setProfileData(profileData));
      }, []);

    return(
        <div>
            
            {!profileData ? 
                "Loading profile data..." : 
                <>
                <h2 className="words">Welcome, {profileData.firstname}</h2><br/>
                <h2 className="clean dataexample">Personal Info</h2>
                <table id="dataTable" className="table clean profiletable">
                    <tbody className="clean">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                        <tr>
                            <th>{profileData.firstname}</th>
                            <th>{profileData.lastname}</th>
                            <th>{profileData.email}</th>
                        </tr>
                </tbody>
                </table>
                </>
            }
        </div>
    )
};

export default Profile;