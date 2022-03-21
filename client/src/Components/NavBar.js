import React, { Component, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import $ from 'jquery'
function NavBar(props) {
  const navigate=useNavigate();
  const currentLocation = useLocation();
  const [img,setImg]=useState(null);
  const menuToggle=useRef();
  const openMenu=()=>{
    $('.menu-hamburger-content').fadeIn()
    $('#fade1').fadeIn(500);
    $('#fade2').delay(200).fadeIn(500);
    $('#fade3').delay(400).fadeIn(500);
    $('#fade4').delay(600).fadeIn(500);
    $('#fade5').delay(800).fadeIn(500);

    menuToggle.current.style.zIndex='10001'
    document.querySelector('body').style.overflow = 'hidden';
  }
  const closeMenu=()=>{
    $('.menu-hamburger-content').fadeOut()
    $('#fade1').hide();
    $('#fade2').hide();
    $('#fade3').hide();
    $('#fade4').hide();
    $('#fade5').hide();
    document.querySelector('body').style.overflow = 'visible';
  }
  // useEffect(()=>{
  //   console.log('fetching avba',props.isLoggedIn)
  //   if (props.isLoggedIn){
  //     axios.get('http://localhost:3001/avatar',{headers:{
  //       Authorization:'Bearer '+localStorage.getItem('AccessToken')
  //     }}).then(result=>setImg(result.data))
  //   }
  // },[props.isLoggedIn])
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
      <div className="menu-hamburger">
          <img  onClick={openMenu} src={require('../Assets/meat.png')}></img>
      </div>
      <div ref={menuToggle} className="menu-hamburger-content">
        <img onClick={closeMenu} src={require('../Assets/delete.png')}></img>
        <div id='fade1'><Link to='/'><img src={require('../Assets/homeicon.png')}></img>Home</Link></div>
        <div id='fade2'><Link to="/search/1?location=&#38;type=&#38;coat=&#38;color=&#38;gender=">Find a pet</Link></div>
        <div id='fade3'><Link to='/'>Contact</Link></div>
        {!props.isLoggedIn?<>
          <div id='fade4'><Link to='/'>Login</Link></div>
          <div id='fade5'><Link to='/'>Sign up</Link></div>
    
        </>:<><div id='fade4'><Link to='/'>My Profile</Link></div>
        <div id='fade5'><Link to='/'>Logout</Link></div>
        </>}
      </div>
      <div className="menu-container">
        <div className="middle-content">
          <Link to="/">
            <span>Home</span>
          </Link>
          <Link to="/search/1?location=&#38;type=&#38;coat=&#38;color=&#38;gender=">
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
              src={props.isLoggedIn}
              onClick={() => setOpen(!open)}
            ></img>
            {open && (
              <div className="dropdown">
                <Link to='/user' state={{chosen:'profile'}}>
                  <div>
                    <img src={require("../Assets/dashboard.png")}></img>
                    <span>Profile</span>
                  </div>
                </Link>
                <Link to='/user' state={{chosen:'mypets'}}>
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
