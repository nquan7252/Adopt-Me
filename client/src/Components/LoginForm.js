import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
function LoginForm(props) {
    const handleLogin=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/login',{username:e.target[0].value,password:e.target[1].value}).then(message=>{
        localStorage.setItem('AccessToken',message.data.accessToken)    
        console.log(message)
        //window.location.href=props.from;
    });
    }
    return <div id='login-container'>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
        <input name='username' type='text' placeholder='Username'></input>
        <input name='password' type='password' placeholder='Password'></input>
        <button>Sign in</button>
    </form>
    <div id='other-actions'>
        <span>Forgot Password?</span>
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