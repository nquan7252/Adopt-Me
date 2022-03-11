import React, { Component, useEffect } from "react";
import "./SearchPage.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Card from "../Components/Card";
import NavBar from "../Components/NavBar";
import Filter from "../Components/Filter";
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:3001/search").then((res) =>{console.log(res.data) 
    setData(res.data)});
  },[]);
  return<><NavBar/>
  <Filter/>
  {data&&<div className="card-container">
     {data.animals.map(element=><Card key={element.id} data={element}></Card>)}
  </div>}
  </> 
}

export default SearchPage;
