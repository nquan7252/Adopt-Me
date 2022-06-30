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
              With this web app, I believe that we can make a difference to ourselves as well as the animals and fill the community with love!
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
              <a href='https://miwa.sbs/' target='_blank'>
              <img src={require('../Assets/website.png')}/>
              </a>
              <a href='https://www.linkedin.com/in/quan-nguyen-299a3a224/' target='_blank'>
              <img src={require('../Assets/linkedin.png')}/>
              </a>
              <a href='https://www.instagram.com/_mquannn_/' target='_blank'>
              <img src={require('../Assets/instagram.png')}/>
              </a>
          </div>
        </div>
      </div>
      <Link id="attribute" to="https://www.flaticon.com/free-icons/instagram" title="instagram icons">Icons created by Freepik - Flaticon</Link>
    </div>
  );
}

export default Contact;
