import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import isLoggedIn from '../Helper/isLoggedIn';
import './Card.css'
import { useEffect } from 'react';
function Card(props) {
    const [saved,setSaved]=useState(false);
    const [loggedIn,setLoggedIn]=useState(null);
    useEffect(() => {
        isLoggedIn()
          .then(() => setLoggedIn(true))
          .catch(() => setLoggedIn(false));
      }, []);
    const handleSave=()=>{
        if (loggedIn)
            return setSaved(!saved);
        props.handleShowRequest();
        }
    return <div className='card'>
         <Link to={{
        pathname:'/pet/profile',
        search:"?id="+props.data.id,
    }} state={{data:props.data}}>
        <img src={props.data.photos.length!=0?props.data.photos[0].full:require('../Assets/noImage.png')}></img>
        </Link>
        <div className='name-holder'>
        <h3>{props.data.name}</h3>
        <h5>{props.data.breeds.primary}</h5>
        <h5>{props.data.contact.address.city+", "+props.data.contact.address.state+" "+props.data.contact.address.postcode}</h5>
        <img className={saved?'heart active':'heart'} src={saved?require('../Assets/heart1.png'):require('../Assets/heart.png')} onClick={handleSave}></img>
        </div>
    </div>
    
}
export default Card;