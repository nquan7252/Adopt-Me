import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import NavBar from '../Components/NavBar';
import isLoggedIn from '../Helper/isLoggedIn';
import { useEffect } from 'react';
import ImageSlider from'../Components/ImageSlider'
import axios from 'axios'
import './PetProfile.css'
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
    const [loggedIn, setLoggedIn] = useState(()=>{
      axios.get('http://localhost:3001/avatar',{headers:{
        authorization:'Bearer '+localStorage.getItem('AccessToken')
      }})
        .then((res) => setLoggedIn(res.data))
        .catch((err) => {
          console.log(err.response.data);
          setLoggedIn(false)});
    });
    return <div>
        <NavBar isLoggedIn={loggedIn}/>
        {data&&<ImageSlider images={data.photos} videos={data.videos}/>}
        <div className='pet-info'>
          <h1>{data.name}</h1>
          <span>Breed: {data.breeds.primary}</span>
          <div><img src={require('../Assets/location.png')}></img>Location: {data.contact.address.address1&&data.contact.address.adress1+','} {data.contact.address.city}, {data.contact.address.state} {data.contact.address.postcode}</div>
        </div>
        </div>;
}

export default PetProfile;