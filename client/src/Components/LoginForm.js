import axios from 'axios';
import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function LoginForm(props) {
    const navigate=useNavigate();
    const [error,setError]=useState(false);
    const handleLogin=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/login',{username:e.target[0].value,password:e.target[1].value}).then(message=>{
        localStorage.setItem('AccessToken',message.data.accessToken)    
        console.log(message)  
        navigate(props.from);
    }).catch(()=>setError(true));
    }
    return <div id='login-container'>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
        <h5>Username</h5>
        <input name='username' type='text' placeholder='Username'></input>
        <h5>Password</h5>
        <input name='password' type='password' placeholder='Password'></input>
        {error&&<div style={{color:'red',fontSize:'10px'}}>Username or password is incorrect</div>}
        <button>SIGN IN</button>
    </form>
    <div id='other-actions'>
        <Link to='/reset-password'>
        <span>Forgot Password?</span>
        </Link>
        <Link to='/signup'>
        <span style={{cursor:'pointer'}}>Sign up</span>
        </Link>
    </div>
    <div id='or'><hr></hr></div>
    {/* <GoogleLogin style={{textAlign:'center'}}
clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
buttonText="Sign in with Google"
onSuccess={null}
onFailure={null}
cookiePolicy={'single_host_origin'}
/> */}
    </div>;
}

export default LoginForm;