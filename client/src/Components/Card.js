import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import isLoggedIn from '../Helper/isLoggedIn';
import './Card.css'
import { useEffect } from 'react';
import axios from 'axios'
import { escapeSelector } from 'jquery';
function Card(props) {
    const [saved,setSaved]=useState(async ()=>{
        axios.get("http://localhost:3001/getSaved",{headers:{
            Authorization:'Bearer ' +localStorage.getItem('AccessToken')}}
        ).then(result=>{
            let likedAnimals=[...result.data]
            console.log('liked animals are',likedAnimals)
            if (likedAnimals.includes(String(props.data.id)))
            setSaved(true) 
            else
            setSaved(false);
        })})

    

        
    
    const [loggedIn,setLoggedIn]=useState(null);
    useEffect(() => {
        isLoggedIn()
          .then(() => setLoggedIn(true))
          .catch(() => setLoggedIn(false));
      }, []);
    const save=()=>{
        console.log('user want to save')
        axios.get('http://localhost:3001/save',{headers:{
        authorization:'Bearer '+ localStorage.getItem('AccessToken')},
    params:{animalId:props.data.id}})
        setSaved(true);
    }
    const unsave=()=>{
        axios.get('http://localhost:3001/unsave',{headers:{
            Authorization:'Bearer '+localStorage.getItem('AccessToken')
        },params:{animalId:props.data.id}})
        setSaved(false)
    }
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
        <img className={saved?'heart active':'heart'} src={saved?require('../Assets/heart1.png'):require('../Assets/heart.png')} onClick={saved?unsave:save}></img>
        </div>
    </div>
    
}
export default Card;