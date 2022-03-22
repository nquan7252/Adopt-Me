import React, { Component, useState } from 'react';
import './LoginPage.css'
import { Link } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';
import SignupForm from '../Components/SignupForm';
import isLoggedIn from '../Helper/isLoggedIn';
import { BrowserHistory } from 'history';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
function LoginPage () {
        const [loggedIn,setLoggedIn]=useState(async ()=>{
            await isLoggedIn().then(()=>setLoggedIn(true)).catch(()=>setLoggedIn(false));
        })
        let navigate=useNavigate();
        const location=useLocation();
        console.log(location)
        
    return <div className='page'>
                {loggedIn?navigate('/user',{state:{chosen:'profile'}}):<LoginForm from={location.state!=null?location.state.from:'/' }/>} 
    </div>;
}

export default LoginPage;