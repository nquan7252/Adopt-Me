import React, { Component, useState } from 'react';
import './LoginPage.css'
import { Link } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';
import SignupForm from '../Components/SignupForm';
import isLoggedIn from '../Helper/isLoggedIn';
import { BrowserHistory } from 'history';
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { Routes } from 'react-router';
function LoginPage () {
        const [loggedIn,setLoggedIn]=useState(async ()=>{
            await isLoggedIn().then(()=>setLoggedIn(true)).catch(()=>setLoggedIn(false));
        })
    return <div className='page'>
                {loggedIn?window.location.href='/user':<LoginForm/>} 
    </div>;
}

export default LoginPage;