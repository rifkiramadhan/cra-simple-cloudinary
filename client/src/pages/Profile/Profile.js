import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Profile.css';

// Import Image dari installasi cloudinary
import { Image } from 'cloudinary-react';

function Profile() {
  const [yourUploads, setYourUploads] = useState([]);
    
  useEffect(() => {
    Axios.get(`http://localhost:3001/upload/byUser/${localStorage.getItem('username')}`)
    .then((response) => {
        setYourUploads(response.data);
    });
  });

  return (    
    <div>
        <h1>{localStorage.getItem('username')}</h1>
        <div className="Profile">
        {yourUploads.map((val, key) => {
            return (
            <div className="Post">
                <div className="Image">

                {/* Memanggil Image dari installasi cloudinary */}
                <Image 
                    cloudName="satgasnas" 
                    publicId={val.image} 
                />

                </div>

                <div className="Content">
                <div className="Title">
                    {val.title} / by @{val.author}
                </div>
                <div className="Description">
                    {val.description}
                </div>
                </div>
                <div className="Engagement">
                <i 
                    className="fa-solid fa-thumbs-up"
                    id="likeButton"
                >
                </i>
                    {val.likes}
                </div>
            </div>      
            )
        })}
        </div>
    </div>
  );
}

export default Profile;