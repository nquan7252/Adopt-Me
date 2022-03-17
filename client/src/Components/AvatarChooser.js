import React, { Component, useCallback } from 'react';
import './AvatarChooser.css'
import { avatar } from '../Helper/Avatar';
import { useState } from 'react';
function AvatarChooser(props) {
    const [active,setActive]=useState(0);
    return <div className='avatar-chooser'>
        {avatar.map((element,index)=><img onClick={()=>{props.handleClick(index);setActive(index)}} id={index==active?'active':''} src={element.path}></img>)}
    </div>;
}

export default AvatarChooser;