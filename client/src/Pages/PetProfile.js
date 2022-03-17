import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import NavBar from '../Components/NavBar';
import isLoggedIn from '../Helper/isLoggedIn';
import { useEffect } from 'react';
import ImageSlider from'../Components/ImageSlider'
import axios from 'axios'
function PetProfile() {
    const location=useLocation();
    const [data,setData]=useState(()=>{
      if (typeof(location.state.data)=='object')
      return location.state.data
      else{
      axios.get('http://localhost:3001/petId',{headers:{
        authorization:'Bearer '+localStorage.getItem('AccessToken')
      }
        ,params:{animalId:location.state.data.split(" ")[1]}}).then((result)=>{
        console.log("omg",result.data.animal)
         setData(result.data.animal);
      })
    }});
    const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    isLoggedIn()
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  }, []);
    return <div>
        <NavBar isLoggedIn={loggedIn}/>
        {data&&<ImageSlider images={data.photos}/>}
        </div>;
}

export default PetProfile;