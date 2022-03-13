import axios from 'axios';
import React, { Component, useState } from 'react';
import { useParams } from 'react-router-dom';
function GuestPage() {
    const {id}=useParams();
    const [userInfo,setUserInfo]=useState(()=>{
        axios.get(`http://localhost:3001/user/${id}`).then(message=>console.log(message));
    });
    return <div>Hello this is guest page {id}</div>;
}

export default GuestPage; 