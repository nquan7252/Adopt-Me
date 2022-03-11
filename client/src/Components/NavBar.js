import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
function NavBar(props) {
    return <div className="navbar">
      <Link to='/'>
    <img src={require("../Assets/logo.png")}></img>
    </Link>
    {!props.isLoggedIn?
    <div>
      <Link to='/login's >
      <span>Log in</span>
      </Link>
      <Link to='/signup'>
      <span>Sign up</span>
      </Link>
      
    </div>:
    <div>Hello user
      <img src={require('../Assets/profileicon.png')}></img>
    </div>
  }
  </div>;
}

export default NavBar;