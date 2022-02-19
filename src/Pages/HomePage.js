import React, { Component, useEffect, useState } from 'react';
import './HomePage.css'
import {images} from '../Helper/ImageHelper'
function HomePage() {
    const [current,setCurrent]=useState(0);
    useEffect(()=>{
        if (current==images.length)
        setCurrent(0)
        else
        setTimeout(()=>setCurrent(current+1),7000)
    },[current])
    return <div>
        <div className='navbar'>
            <img src={require("../Assets/logo.png")}></img>
            <div>
            <span>Log in</span>
            <span>Sign up</span>
            </div>
        </div>
        <div className='body'>
            {images.map((element,index)=>{
                return (<div className={current==index?'slide active':'slide'}>
                 {current==index&&<img src={element.link}></img>}
                 </div>)
            })}
            <div className='content'>
                <h3>Every animal deserves an opportunity</h3>
            </div>
        </div>
        <footer></footer>
    </div>;
}

export default HomePage;