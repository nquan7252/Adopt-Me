import axios from 'axios';

import React, { Component, useState } from 'react';
function UserPage() {
    const handleLogout=()=>{
        localStorage.removeItem('AccessToken');
        window.location.href='/logoutSuccess'
    }
    const [user,setUser]=useState(()=>{
        if (localStorage.getItem('AccessToken')){
        axios.get('http://localhost:3001/user',{
            headers:{
                Authorization:'Bearer '+localStorage.getItem('AccessToken')
            }
        }).then(res=>{console.log(res.data[0])
            setUser(res.data[0])}).catch(console.log)
    }
    else{
        window.location.href='/'
    }
});
    return<>
     <div>Hello{user?.name}</div>;
     <button onClick={handleLogout}>Log out</button>
     </>
}

export default UserPage;