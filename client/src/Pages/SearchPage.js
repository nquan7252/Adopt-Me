import React, { Component, useEffect, useRef } from "react";
import "./SearchPage.css";
import { useLocation, useSearchParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
function SearchPage(props) {
  const navigate=useNavigate()
  const overlay=useRef();
  const pageNum=useParams();
  const [searchParams,setSearchParams]=useSearchParams()

  console.log(searchParams.get("num"))
  const [para,setPara]=useState({location:searchParams.get('location'),
  type:searchParams.get('type'),
  coat:searchParams.get('coat'),
  color:searchParams.get('color'),
  gender:searchParams.get('gender')})
  //consider changing this to get avatar faster
  // const [loggedIn, setLoggedIn] = useState(()=>{
  //   isLoggedIn()
  //     .then(() => setLoggedIn(true))
  //     .catch((err) => {
  //       console.log(err.response.data);
  //       setLoggedIn(false)});
  // });
  const [loggedIn, setLoggedIn] = useState(()=>{
    axios.get('http://localhost:3001/avatar',{headers:{
      authorization:'Bearer '+localStorage.getItem('AccessToken')
    }})
      .then((res) => setLoggedIn(res.data))
      .catch((err) => {
        console.log(err.response.data);
        setLoggedIn(false)});
  });
  const [currentPage,setCurrentPage]=useState(()=>{
    return pageNum.page;
  });
  const [filterParams,setfilterParams]=useState({location:'',type:'',coat:'',color:'',gender:''})
  const handleFilterSearch=(info)=>{
    //axios.get('http://localhost:3001/search/1')
    //set params
    let queryparam=`location=${info.location}&type=${info.type}&color=${info.color}&coat=${info.coat}&gender=${info.gender}`
   // props.navigation.push('/search/1?'+queryparam)
   window.location.href='/search/1?'+queryparam;
  }
  const handleShowRequest=()=>{
    setShowRequest(true);
    overlay.current.style.display='block'
  }
  const handleCloseRequest=()=>{
    setShowRequest(false);
    overlay.current.style.display='none'
  }
  const handleSave=(data)=>{
    setSaved(prev=>[...prev,String(data.id)]);
    axios.get('http://localhost:3001/save',{headers:{
    authorization:'Bearer '+ localStorage.getItem('AccessToken')},
    params:{
    animalId:data.id,
    animalName:data.name,
    animalPhoto:data.photos[0].medium,
    animalGender:data.gender,
    animalLocation:data.contact.address.city+", "+data.contact.address.state+" "+data.contact.address.postcode,
    animalBreed:data.breeds.primary

}})
  }
  const handleUnsave=(data)=>{
    setSaved(prev=>{
      let arr=[...prev];
      arr.splice(arr.indexOf(String(data.id)),1)
      return arr
    })
    axios.get('http://localhost:3001/unsave',{headers:{
    authorization:'Bearer '+ localStorage.getItem('AccessToken')},
    params:{
    animalId:data.id,
    animalName:data.name,
    animalPhoto:data.photos[0].medium,
    animalGender:data.gender,
    animalLocation:data.contact.address.city+", "+data.contact.address.state+" "+data.contact.address.postcode,
    animalBreed:data.breeds.primary
}})
    // setSaved(prev=>{
    //   let savedArray=[...prev]
    //   return savedArray.splice(savedArray.indexOf(data.id),1)
    // })
  }
  const [showRequest,setShowRequest]=useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log('hereeee',currentPage)
    axios.get(`http://localhost:3001/search/${currentPage}`,{params:para}).then((res) =>{console.log(res.data) 
    setData(res.data)
  }
    ).catch(err=>{
      setfilterParams({location:'',type:'',coat:'',color:'',gender:''})
      alert('Invalid input, please type in postal codes only')});
  },[currentPage]);

  

  const [saved,setSaved]=useState([])
  
  useEffect(()=>{
    if (loggedIn){
      console.log('start fetching save')
    axios.get("http://localhost:3001/getSaved",{headers:{
        Authorization:'Bearer ' +localStorage.getItem('AccessToken')}}
    ).then(result=>{
      console.log('result from getsave is',result.data)
        let likedAnimals=[...JSON.parse(result.data)]
        let idArray=[]
        for (let i=0;i<likedAnimals.length;i++){
          idArray.push(likedAnimals[i].id)
        }
        setSaved(idArray)
    }).catch(()=>{console.log('some thing wrong')
      setSaved([])})}
    else return null
},[loggedIn])
    
    
  const checkSave=(id)=>{
    if (saved!=null){
      for (let idd of saved)
      if(idd==id)return true;
  }
  return false;
  }
  return<><NavBar isLoggedIn={loggedIn}/>
  <Filter handleSearch={handleFilterSearch}/>
  <div className="big-card-container">
    <div ref={overlay} className="overlay"></div>
  {data?<div className="card-container">
     {data.animals.map(element=><Card location={element.contact.address.city+", "+element.contact.address.state+" "+element.contact.address.postcode} breed={element.breeds.primary} image={element.primary_photo_cropped?element.primary_photo_cropped.medium:null} isSaved={checkSave(element.id)} unsave={handleUnsave} save={handleSave} key={element.id} loggedIn={loggedIn} handleShowRequest={handleShowRequest} data={element}></Card>)}
  </div>:<Spinner/>}
  {showRequest&&<RequestLogin closeRequest={handleCloseRequest}/>}
  {data&&<Pagination totalPages={data.pagination.total_pages} jumpPage={(page)=>{
    setCurrentPage(page)
    window.location.href=`/search/${page}?location=${para.location}&type=${para.type}&coat=${para.coat}&color=${para.color}&gender=${para.gender}`
  }} currentPage={currentPage} nextPage={()=>{
    setCurrentPage(Number(currentPage)+1);
    window.location.href=`/search/${Number(currentPage)+1}?location=${para.location}&type=${para.type}&coat=${para.coat}&color=${para.color}&gender=${para.gender}`
}} prevPage={()=>{
  setCurrentPage(Number(currentPage)-1);
  window.location.href=`/search/${Number(currentPage)-1}?location=${para.location}&type=${para.type}&coat=${para.coat}&color=${para.color}&gender=${para.gender}`
}}/>}
  </div>
  </> 
}

export default SearchPage;
