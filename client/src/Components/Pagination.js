import React, { Component } from 'react';
function Pagination(props) {
    return <div className='pagination'>
        <button onClick={props.nextPage}>Next</button>
    </div>;
}

export default Pagination;