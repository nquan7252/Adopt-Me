import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Card.css'
function Card(props) {
    return <Link to={{
        pathname:'/pet/profile',
        search:"?id="+props.data.id,
        
    }} state={{data:props.data}}>
     <div className='card'>
        <img src={props.data.photos.length!=0?props.data.photos[0].full:require('../Assets/noImage.png')}></img>
        <h3>{props.data.name.toUpperCase()}</h3>
    </div>
    </Link>;
}
export default Card;