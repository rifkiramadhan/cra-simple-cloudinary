import React, { useEffect, useState } from 'react';
import './Home.css';

// Import Image dari installasi cloudinary
import { Image } from 'cloudinary-react';

import Axios from 'axios';

function Home() {
  const [uploads, setUploads] = useState([]);
  
  useEffect(() => {
    if(!localStorage.getItem('loggedIn')) {
      localStorage.setItem('loggedIn', false);
    };
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3001/upload').then((response) => {
      setUploads(response.data);
    });
  }, []);

  const likePost = (id, key) => {
    var tempLikes = uploads;
    tempLikes[key].likes = tempLikes[key].likes + 1;

    Axios.post('http://localhost:3001/upload/like', {
      userLiking: localStorage.getItem('username'),
      postId: id
    }).then((response) => {
      setUploads(tempLikes);    
    });
  };

  return (
    <div className="Home">
      {uploads.map((val, key) => {
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
                onClick={() => {
                  likePost(val.id, key);
                }}
              >
              </i>
                {val.likes}
            </div>
          </div>      
        )
      })}
    </div>
  );
};

export default Home;