import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './NavBar.css'
function NavBar(props) {
  const currentLocation=useLocation();
    return <div className="navbar">
      <Link to='/'>
    <img src={require("../Assets/logo.png")}></img>
    </Link>
    <div className='menu-container'>
    <div className='middle-content'>
      <Link to='/'>
      <span>Home</span>
      </Link>
      <Link to='/search'>
      <span>Find a pet</span>
      </Link>
      <span>Contact</span>
    </div>
    {!props.isLoggedIn?
    <div className='login-signup'>
      <Link to='/login' state={{from:window.location.pathname}}>
      <span id='login'>Login</span>
      </Link>
      <Link to='/signup' state={{from:window.location.pathname}}>
      <span>Sign up</span>
      </Link>
    </div>:
    <div className='login-signup user'>
      <Link to='/user'>
      <img src={require('../Assets/profileicon.png')}></img>
    </Link>
    </div>
    
  }
  </div>
  </div>;
}

export default NavBar;