import React, { Component } from 'react';
import './Contact.css'
function Contact() {
    return <div className='contact'>
            <div className='logo-container'>
                <img src={require('../Assets/logo.png')}/>
                <h5>We care for the animals</h5>
            </div>
            <div className='info'>
                <div>
                <h3>Creator</h3>
                <h5>Quan Nguyen</h5>
                <h5>nquan7252@gmail.com</h5>
                <h5>+1 (858)-371-9649</h5>
                <div className='social'>
                </div>
                </div>
            </div>
            
    </div>;
}

export default Contact;