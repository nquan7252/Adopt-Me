import React, { Component } from 'react';
import AvatarChooser from './AvatarChooser';
import './AvatarChange.css'
function AvatarChanger() {
    return <div className='showava'>
        <img src={require('../Assets/delete.png')}></img>
        <div><AvatarChooser/></div>
        <button>Update avatar</button>
    </div>;
}

export default AvatarChanger;