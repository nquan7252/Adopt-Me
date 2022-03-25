import axios from 'axios';
import React, { Component, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SuccessModal from '../Components/SuccessModal';
import './PasswordReset.css'
function PasswordResetPage2() {
    const [showSuccess,setShowSuccess]=useState(false);
    const handleSubmit=(e)=>{
        console.log(para)
        e.preventDefault();
        console.log('new password is',e.target[0].value)
        if (e.target[0].value!=e.target[1].value)
        alert('Passwords do not match')
        else if (e.target[0].value.length<8)
        alert('Password has to be at least 8 characters')
        else 
        axios.put('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/reset-password-next',{newPassword:e.target[0].value,token:para.token}).then(()=>setShowSuccess(true)).catch(console.log)
    }
    const para=useParams();
    console.log(para);
    const [valid,setValid]=useState(()=>{
        axios.get('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/authenticate',{headers:{
            Authorization:'Bearer '+para.token
        }}).then(()=>setValid(true)).catch(()=>setValid(false))
    })
    return valid?<div className='password-reset'>
        {showSuccess&&<><div className='overlay'></div><SuccessModal/></>}
        <div>
            <h1>Password Reset</h1>
        <h3>Enter your new password:</h3>
        <form onSubmit={handleSubmit}>
    <input type='password'></input>
    <h3>Confirm your new password:</h3>
    <input type='password'></input>
    <input type='submit' value='Change Password'></input>
</form></div></div>:<div>Invalid token</div>
    
    
    
    
}

export default PasswordResetPage2;