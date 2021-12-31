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
                <table className="table clean profiletable">
                    <tbody className="clean">
                        <tr>
                            <td>Name</td>
                            <td>{profileData.name}</td>
                        </tr>
                        <tr>
                            <td>School</td>
                            <td>{profileData.school}</td>
                        </tr>
                        <tr>
                            <td>Major</td>
                            <td>{profileData.major}</td>
                        </tr>
                    </tbody>
                </table>
                </>
            }
        </div>
    )
};

export default Profile;