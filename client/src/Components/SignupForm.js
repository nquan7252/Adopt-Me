import React, { Component, useEffect } from 'react';
import '../Pages/LoginPage.css'
import { useState } from 'react';
import axios from 'axios';
import { avatar } from '../Helper/Avatar';
import { useNavigate } from 'react-router-dom';
import AvatarChooser from './AvatarChooser';
function SignupForm(props) {
    const getRandomAvatar=()=>{
        let random=avatar[Math.floor(Math.random()*avatar.length)]
        return random;
    }
    const [error,setError]=useState(null);
    const[avatarr,setAvatar]=useState(avatar[0].path)
    const navigate=useNavigate()
    const signup=(e)=>{
        e.preventDefault();
        if (e.target[2].value.length<8)
        alert('Password has to be at least 8 characters')
        else{
            axios.post('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/signup',{name:e.target[0].value,email:e.target[1].value,password:e.target[2].value,avatar:avatarr}).then(navigate('/login')).catch(err=>setError(err.response.data.message));
        }
    }
    const handleClick=(index)=>{
        console.log(index,'clicked')
        setAvatar(avatar[index].path);
    }
    return <div id='login-container'>
        <h2>Sign up</h2>
        <form onSubmit={signup}>
            <input required name='name' type='text' placeholder='Name'></input>
            <input required name='email'type='text' placeholder='Email'></input>
            <input required name='password' type='password' placeholder='Password'></input>
            {error!=null&&<div style={{color:'red'}}>*{error}</div>}
            <h4>Choose an avatar:</h4>
            <AvatarChooser handleClick={handleClick}/>
            <button>Sign up</button>
        </form>
         </div>;
}

export default SignupForm;