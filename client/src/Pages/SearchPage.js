import React, { Component, useEffect, useRef } from "react";
import "./SearchPage.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Card from "../Components/Card";
import NavBar from "../Components/NavBar";
import Filter from "../Components/Filter";
import isLoggedIn from "../Helper/isLoggedIn";
import Spinner from "../Components/Spinner";
import RequestLogin from "../Components/RequestLogin";
import { useParams } from "react-router-dom";
import Pagination from "../Components/Pagination";
function SearchPage(props) {
  const overlay=useRef();
  const pageNum=useParams();
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    isLoggedIn()
      .then(() => setLoggedIn(true))
      .catch((err) => {
        console.log(err.response.data);
        setLoggedIn(false)});
  }, []);
  const [currentPage,setCurrentPage]=useState(()=>{
    return pageNum.page;
  });
  const handleShowRequest=()=>{
    setShowRequest(true);
    overlay.current.style.display='block'
  }
  const handleCloseRequest=()=>{
    setShowRequest(false);
    overlay.current.style.display='none'
  }
  const [showRequest,setShowRequest]=useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log('hereeee',currentPage)
    axios.get(`http://localhost:3001/search/${currentPage}`).then((res) =>{console.log(res.data) 
    setData(res.data)}).catch(err=>console.log(err.response.data));
  },[currentPage]);
  return<><NavBar isLoggedIn={loggedIn}/>
  <Filter/>
  <div className="big-card-container">
    <div ref={overlay} className="overlay"></div>
  {data?<div className="card-container">
     {data.animals.map(element=><Card key={element.id} handleShowRequest={handleShowRequest} data={element}></Card>)}
  </div>:<Spinner/>}
  {showRequest&&<RequestLogin closeRequest={handleCloseRequest}/>}
  <Pagination nextPage={()=>setCurrentPage(currentPage+1)}/>
  </div>
  </> 
}

export default SearchPage;
