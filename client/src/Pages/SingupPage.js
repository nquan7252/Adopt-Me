import React, { Component } from 'react';
import SignupForm from '../Components/SignupForm';
import isLoggedIn from '../Helper/isLoggedIn';
import { useState } from 'react';
import LoginForm from '../Components/LoginForm';
import { useNavigate } from 'react-router-dom';
function SignupPage() {
    const [loggedIn,setLoggedIn]=useState(async ()=>{
        await isLoggedIn().then(()=>setLoggedIn(true)).catch(()=>setLoggedIn(false));
    })
    const navigate=useNavigate();
    return <div className='page'>
        {loggedIn?navigate('/user'):<SignupForm/>} 
        </div>
}

export default SignupPage;