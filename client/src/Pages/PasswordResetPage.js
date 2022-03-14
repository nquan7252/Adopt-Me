import axios from 'axios';
import React, { Component } from 'react';
function PasswordResetPage() {
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/reset-password',{username:e.target[0].value}).then(console.log).catch(console.log)
    }
    return <div>
        <form onSubmit={handleSubmit}>
            <input type='text'></input>
            <button></button>
        </form>
    </div>;
}

export default PasswordResetPage;