import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
function PetProfile() {
    const location=useLocation();
    const dat=location.state;
    const {data,setData}=useState(location.state);
    return <div>{dat.name}</div>;
}

export default PetProfile;