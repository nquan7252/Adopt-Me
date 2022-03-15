import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import NavBar from '../Components/NavBar';
import isLoggedIn from '../Helper/isLoggedIn';
import { useEffect } from 'react';
import ImageSlider from'../Components/ImageSlider'
function PetProfile() {
    const location=useLocation();
    const [data,setData]=useState(location.state.data);
    const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    isLoggedIn()
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  }, []);
    return <div>
        <NavBar isLoggedIn={loggedIn}/>
        <ImageSlider images={data.photos}/>
        </div>;
}

export default PetProfile;