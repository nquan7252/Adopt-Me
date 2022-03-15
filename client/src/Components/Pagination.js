import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import './Pagination.css'
function Pagination(props) {
    const [currentPage,setCurrentPage]=useState(null);
    useEffect(()=>{
        setCurrentPage(props.currentPage)
    },[props.currentPage])
    var firstElement=currentPage>=4?currentPage-2:1;
    var lastElement=currentPage>=4?currentPage+2:5;
    var pageArray=[];
    for (let i=firstElement;i<=lastElement;i++){
        pageArray.push(i)
    }
    return <div className='pagination'>
                {currentPage>=2&&<img src={require('../Assets/arrowleft.png')} onClick={props.prevPage}></img>}
        {/* <div>{currentPage}</div> */}
        {pageArray.map(element=><div id={currentPage==element?'activepage':''} key={element}>{element}</div>)}
        <img src={require('../Assets/arrowright.png')} onClick={props.nextPage}></img>
    
    </div>;
}

export default Pagination;