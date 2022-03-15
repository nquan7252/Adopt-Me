import React, { Component } from 'react';
import './SelectionBar.css'
function SelectionBar(props) {
    return <div className='selection-bar'>
        <span onClick={()=>props.onClick('profile')} id={props.active=='profile'?'active':""} style={props.active=='profile'?{color:'black'}:{}}>My Profile</span>
        <span onClick={()=>props.onClick('favorites')} id={props.active=='favorites'?'active':''} style={props.active=='favorites'?{color:'black'}:{}}>My favorites</span>
    </div>;
}

export default SelectionBar;