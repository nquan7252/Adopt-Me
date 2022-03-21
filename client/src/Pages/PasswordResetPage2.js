import axios from 'axios';
import React, { Component, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
function PasswordResetPage2() {
    const handleSubmit=(e)=>{
        console.log(para)
        e.preventDefault();
        console.log('new password is',e.target[0].value)
        axios.put('http://localhost:3001/reset-password-next',{newPassword:e.target[0].value,token:para.token}).then(console.log).catch(console.log)
    }
    const para=useParams();
    console.log(para);
    const [valid,setValid]=useState(()=>{
        axios.get('http://localhost:3001/authenticate',{headers:{
            Authorization:'Bearer '+para.token
        }}).then(()=>setValid(true)).catch(()=>setValid(false))
    })
    return valid?<div>
        <h3>whiehriwhe</h3>
        <form onSubmit={handleSubmit}>
    <input type='text'></input>
    <input type='submit' value='hi'></input>
</form></div>:<div>Invalid token</div>
    
    
    
    
}

export default PasswordResetPage2;