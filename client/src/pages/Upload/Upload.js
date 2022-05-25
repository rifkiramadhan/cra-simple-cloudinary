import React, { useState } from 'react';
import './Upload.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function Upload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState([]);

  let history = useHistory();

  const upload = () => {
    const formData = new FormData();
    formData.append('file', image[0]);
    
    // Membuat preset data dari Upload presets cloudinary 
    formData.append('upload_preset', 'rifki-inc');
    
    // Membuat API dari website cloudinary dan mengambil nama satgasnas dari nama company cloudinary
    Axios.post(`https://api.cloudinary.com/v1_1/satgasnas/image/upload`, formData)
    .then((response)=> {
      const fileName = response.data.public_id;
      
      // Kemudian mengupload data ke database
      Axios.post('http://localhost:3001/upload', {
        title: title, 
        description: description, 
        image: fileName,
        author: localStorage.getItem('username')
      }).then(() => {
        history.push('/');
      });
    });
  };

  return (
    <div className="Upload">
        <h1>Create A Post</h1>
        <div className="UploadForm">
          <input 
            type="text" 
            placeholder="Input your title" 
            onChange={(event) => {setTitle(event.target.value)}} 
          />
          <input 
            type="text" 
            placeholder="Your description" 
            onChange={(event) => {setDescription(event.target.value)}}
          />
          <input 
            type="file"
            onChange={(event) => setImage(event.target.files)}
          />
          <button onClick={upload}>Upload</button>
        </div>
    </div>
  );
};

export default Upload;