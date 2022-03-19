import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import './Pagination.css'
function Pagination(props) {
    const [currentPage,setCurrentPage]=useState(null);
    useEffect(()=>{
        setCurrentPage(props.currentPage)
    },[props.currentPage])
    var firstElement=currentPage>=4?currentPage-2:1;
    if (props.totalPages<=5){
        var lastElement=props.totalPages;
    }
    else{
        var lastElement=currentPage>=4?(Number(currentPage)+2<=props.totalPages?Number(currentPage)+2:props.totalPages):5;
        console.log('last element is',lastElement)
    }
    var pageArray=[];
    for (let i=firstElement;i<=lastElement;i++){
        pageArray.push(i)
    }
    return <div className='pagination'>
        {currentPage>=2&&<img src={require('../Assets/arrowleft.png')} onClick={props.prevPage}></img>}
        {/* <div>{currentPage}</div> */}
        {pageArray.map(element=><div id={currentPage==element?'activepage':''} key={element} onClick={()=>props.jumpPage(element)}>{element}</div>)}
        {currentPage<props.totalPages&&<img src={require('../Assets/arrowright.png')} onClick={props.nextPage}></img>}
    
    </div>;
}

export default Pagination;