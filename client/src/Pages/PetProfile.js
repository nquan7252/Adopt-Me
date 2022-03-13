import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import NavBar from '../Components/NavBar';
import isLoggedIn from '../Helper/isLoggedIn';
import { useEffect } from 'react';
function PetProfile() {
    const location=useLocation();
    const dat=location.state;
    const {data,setData}=useState(location.state);
    const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    isLoggedIn()
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  }, []);
    return <div>
        <NavBar isLoggedIn={loggedIn}/>
        {dat.name}</div>;
}

export default PetProfile;