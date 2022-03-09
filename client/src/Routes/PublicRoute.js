import React, { Component } from 'react';
import isLoggedIn from '../Helper/isLoggedIn';
import HomePage from '../Pages/HomePage';

import { Route } from 'react-router';
function PublicRoute({element: Component, restricted, ...rest}) {
    return (  
        <Route {...rest} render={props => (
            isLoggedIn() && restricted ?
                window.location.href='/dashboard'
            : <Component {...props} />
        )} />
    );
}

export default PublicRoute;