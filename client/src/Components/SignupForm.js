import React, { Component } from 'react';
import '../Pages/LoginPage.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SignupForm(props) {
    const [error,setError]=useState(null);
    const navigate=useNavigate()
    const signup=(e)=>{
        e.preventDefault();
        if (e.target[2].value.length<8)
        alert('Password has to be at least 8 characters')
        else 
        axios.post('http://localhost:3001/signup',{name:e.target[0].value,email:e.target[1].value,password:e.target[2].value}).then(navigate('/login')).catch(err=>setError(err.response.data.message));
    }
    return <div id='login-container'>
        <div>Back to Log in</div>
        <h2>Sign up</h2>
        <form onSubmit={signup}>
            <input required name='name' type='text' placeholder='Name'></input>
            <input required name='email'type='text' placeholder='Email'></input>
            <input required name='password' type='password' placeholder='Password'></input>
            {error!=null&&<div style={{color:'red'}}>*{error}</div>}
            <button>Sign up</button>
        </form>
         </div>;
}

export default SignupForm;