import React, { useState } from 'react';
import './Register.css';
import Axios from 'axios';

function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    Axios.post('http://localhost:3001/users/register', {username: username, password: password})
    .then((response) => {
      console.log(response)
    })
  };

  return (
    <div className="Register">
      <h1>Register</h1>
        <div className="RegisterForm">
          <input 
            type="text" 
            placeholder="Input your username" 
            onChange={(event) => {setUsername(event.target.value)}} 
          />
          <input 
            type="password" 
            placeholder="Your password" 
            onChange={(event) => {setPassword(event.target.value)}}
          />
          <button onClick={register}>Register</button>
        </div>
    </div>
  );
};

export default Register;