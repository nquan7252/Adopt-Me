import React, { Component } from 'react';
import './ImageIndex.css'
function ImageIndex(props) {
    return <div className='image-index'>
        {new Array(props.length).fill(0).map((element,index)=>index==props.active?<div className='active'></div>:<div onClick={()=>props.handleClick(index)} key={index}></div>)}
    </div>;
}

export default ImageIndex;