import React, { Component } from 'react';
import {images} from '../Helper/ImageHelper'
import './ImageSlider.css'
import { useState } from 'react';
import ImageIndex from './ImageIndex';
function ImageSlider() {
    const [currentImg,setCurrentImg]=useState(0);
    return <div className='image-slider-container'>
        <div className='image-slider' style={{transform:`translateX(-${currentImg*100}%)`}}>
        <div>div1</div>
        <div>div2</div>
        <div>div3</div>
        <div>div4</div>
        <div>div5</div>
        </div>
        <img src={require('../Assets/arrowright.png')} onClick={()=>setCurrentImg(currentImg==2?0:currentImg+1)}></img>
        <img src={require('../Assets/arrowleft.png')} onClick={()=>setCurrentImg(currentImg==0?2:currentImg-1)}></img>
        <ImageIndex length={3} active={currentImg}/>
    </div>;
}

export default ImageSlider;