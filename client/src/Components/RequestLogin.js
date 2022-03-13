import React, { Component } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './RequestLogin.css'
function RequestLogin(props) {
    return <div className='request-login'>
        <h4>
            You must login first to use this feature.   
        </h4>
        <div>
        <Link to='/login' state={{ from: window.location.pathname }}>
            Login
        </Link>
        <span> or </span>
        <Link to='/signup'>
            Signup
        </Link>
        </div>
        <img src={require('../Assets/delete.png')} onClick={()=>props.closeRequest()}></img>
    </div>;
}

export default RequestLogin;