import React, { Component } from 'react';
import SignupForm from '../Components/SignupForm';
import isLoggedIn from '../Helper/isLoggedIn';
import { useState } from 'react';
import LoginForm from '../Components/LoginForm';
function SignupPage() {
    return <div className='page'>
        {isLoggedIn().then(()=>window.location.href='/user').catch(()=><SignupForm/>)} </div>;
}

export default SignupPage;