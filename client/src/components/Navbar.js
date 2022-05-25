import React, { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);
  
  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn'));
  }, [localStorage.getItem('loggedIn')]);
  
  return (
    <div className='Navbar'>
        <a href='/'>Home</a>
        { loggedIn ? (
          <>
              <a href='/upload'>Upload</a>
              <a href='/profile'>Profile</a>
          </>
        ) : (
          <>  
            <a href='/login'>Login</a>
            <a href='/register'>Register</a>
          </>
        )}
    </div>
  );
};

export default Navbar;