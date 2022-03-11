import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function NavBar(props) {
  const navigate=useNavigate();
  const currentLocation = useLocation();
  const [open, setOpen] = useState(false);
  const logOut=()=>{
    localStorage.removeItem('AccessToken');
    window.location.href='/'
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img src={require("../Assets/logo.png")}></img>
      </Link>
      <div className="menu-container">
        <div className="middle-content">
          <Link to="/">
            <span>Home</span>
          </Link>
          <Link to="/search">
            <span>Find a pet</span>
          </Link>
          <span>Contact</span>
        </div>
        {!props.isLoggedIn ? (
          <div className="login-signup">
            <Link to="/login" state={{ from: window.location.pathname }}>
              <span id="login">Login</span>
            </Link>
            <Link to="/signup" state={{ from: window.location.pathname }}>
              <span>Sign up</span>
            </Link>
          </div>
        ) : (
          <div className="login-signup user">
            <img
              src={require("../Assets/profileicon.png")}
              onClick={() => setOpen(!open)}
            ></img>
            {open && (
              <div className="dropdown">
                <Link to="/user">
                  <div>
                    <img src={require("../Assets/dashboard.png")}></img>
                    <span>Profile</span>
                  </div>
                </Link>
                <Link to="/archive">
                  <div>
                    <img src={require("../Assets/archive.png")}></img>
                    <span>My pets</span>
                  </div>
                </Link>
                  <div onClick={logOut}>
                    <img src={require("../Assets/exit.png")}></img>
                    <span>Sign out</span>
                  </div>
              </div>
            )}
            <Link to="/user"></Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
