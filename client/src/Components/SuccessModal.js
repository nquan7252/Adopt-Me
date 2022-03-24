import React, { Component } from 'react';
import './SuccessModal.css'
import { Link } from 'react-router-dom';
function SuccessModal() {
    return <div className='success-modal'>
        <h3>Password is successfully changed!</h3>
        <Link to='/user' state={{chosen:'profile'}}>
        <button>Take me back</button>
        </Link>
    </div>;
}

export default SuccessModal;