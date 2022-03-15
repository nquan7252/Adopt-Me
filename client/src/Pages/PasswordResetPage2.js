import axios from 'axios';
import React, { Component, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
function PasswordResetPage2() {
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/reset-password',{username:e.target[0].value}).then(console.log).catch(console.log)
    }
    const params=useParams();
    console.log(params);
    const [valid,setValid]=useState(()=>{
        axios.get('http://localhost:3001/authenticate',{headers:{
            Authorization:'Bearer '+params.token
        }}).then(()=>setValid(true)).catch(()=>setValid(false))
    })
    return valid?<div>
        <form onSubmit={handleSubmit}>
    <input type='text'></input>
    <button></button>
</form></div>:<div>Invalid token</div>
    
    
    
    
}

export default PasswordResetPage2;