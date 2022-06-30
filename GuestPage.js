import axios from 'axios';
import React, { Component, useState } from 'react';
import { useParams } from 'react-router-dom';
function GuestPage() {
    const {id}=useParams();
    const [userInfo,setUserInfo]=useState(()=>{
        axios.get(`https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/user/${id}`).then();
    });
    return <div>Hello this is guest page {id}</div>;
}

export default GuestPage; 