import React, { Component } from 'react';
import {images} from '../Helper/ImageHelper'
import './ImageSlider.css'
import { useState } from 'react';
import ImageIndex from './ImageIndex';
function ImageSlider(props) {
    const setActive=(index)=>{
        setCurrentImg(index);
    }
    const [images,setImages]=useState(props.images);
    const [currentImg,setCurrentImg]=useState(0);
    return <div className='image-slider-container'>
        <div className='image-slider' style={{transform:`translateX(-${currentImg*100}%)`}}>
        {images.map((element,index)=><img src={element.full}></img>)}
        </div>
        <img src={require('../Assets/arrowright.png')} onClick={()=>setCurrentImg(currentImg==images.length-1?0:currentImg+1)}></img>
        <img src={require('../Assets/arrowleft.png')} onClick={()=>setCurrentImg(currentImg==0?images.length-1:currentImg-1)}></img>
        <ImageIndex length={images.length} handleClick={setActive} active={currentImg}/>
    </div>;
}

export default ImageSlider;