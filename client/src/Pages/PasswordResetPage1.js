import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function PasswordResetPage1() {
    const [error,setError]=useState(false)
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/reset-password',{username:e.target[0].value}).then(
            (result)=>{
                console.log('success, an email has been sent to you')   
            }
        ).catch((err)=>{setError(err.response.data)})
    }
    return <div>
        <h3>Enter your registered email</h3>
        <form onSubmit={handleSubmit}>
            <input type='text'></input>
            <button>Enter</button>
        </form>
        {error&&<h5>{error}</h5>}
    </div> ;
}

export default PasswordResetPage1;