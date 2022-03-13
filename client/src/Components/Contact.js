import React, { Component } from "react";
import "./Contact.css";
import { Link } from "react-router-dom";
function Contact() {
  return (
    <div className="contact">
      <div className="logo-container">
        <img src={require("../Assets/logo.png")} />
        <h5>We care for the animals</h5>
      </div>
      <div className="about">
          <h3>About me</h3>
          <p>I'm currently a sophomore CS student in San Diego who is always devote myself to learn and create meaningful products.
              With this web app, I believe that pets are humans best friend and something was about to happen 
               </p>
      </div>
      <div className="info">
        <div>
          <h3>Creator</h3>
          <h5>Quan Nguyen</h5>
          <h5>nquan7252@gmail.com</h5>
          <h5>+1 (858)-371-9649</h5>
          <div className="social">
              <h3>Follow me</h3>
              <img src={require('../Assets/website.png')}/>
              <img src={require('../Assets/linkedin.png')}/>
              <img src={require('../Assets/instagram.png')}/>
          </div>
        </div>
      </div>
      <Link id="attribute" to="https://www.flaticon.com/free-icons/instagram" title="instagram icons">Icons created by Freepik - Flaticon</Link>
    </div>
  );
}

export default Contact;