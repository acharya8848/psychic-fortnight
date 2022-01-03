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
            <h2 className="words">This is your Profile page.</h2><br/>
            
            {!profileData ? 
                "Loading profile data..." : 
                <>
                <h2 className="clean dataexample">{profileData.message}</h2>
                <table id="dataTable" className="table clean profiletable">
                    <tbody className="clean">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>School</th>
                            <th>Major</th>
                        </tr>
                    </tbody>
                </table>
                </>
            }
        </div>
    )
};

export default Profile;