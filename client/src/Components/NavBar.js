import React, { Component } from 'react';
import { Link } from 'react-router-dom';
function NavBar() {
    return <div className="navbar">
      <Link to='/'>
    <img src={require("../Assets/logo.png")}></img>
    </Link>
    <div>
      <span>Log in</span>
      <span>Sign up</span>
    </div>
  </div>;
}

export default NavBar;