import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import NavBar from '../Components/NavBar';
import isLoggedIn from '../Helper/isLoggedIn';
import { useEffect } from 'react';
import ImageSlider from'../Components/ImageSlider'
import axios from 'axios'
import './PetProfile.css'
import RequestLogin from '../Components/RequestLogin';
function PetProfile() {
    const location=useLocation();
    const handleSave=()=>{
      console.log('asdasdasd')
        if(!loggedIn) return setShowRequest(true);
        axios.get('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/save',{headers:{
    authorization:'Bearer '+ localStorage.getItem('AccessToken')},
    params:{
    animalId:data.id,
    animalName:data.name,
    animalPhoto:data.photos.length>=1?data.photos[0].medium:null,
    animalGender:data.gender,
    animalLocation:data.contact.address.city+", "+data.contact.address.state+" "+data.contact.address.postcode,
    animalBreed:data.breeds.primary
}})
.then(()=>setSaved(true));
    }
    const handleUnsave=()=>{
      axios.get('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/unsave',{headers:{
        authorization:'Bearer '+ localStorage.getItem('AccessToken')},
        params:{
        animalId:data.id,
        animalName:data.name,
        animalPhoto:data.photos.length>=1?data.photos[0].medium:null,
        animalGender:data.gender,
        animalLocation:data.contact.address.city+", "+data.contact.address.state+" "+data.contact.address.postcode,
        animalBreed:data.breeds.primary
    }})
    .then(()=>setSaved(false));
    }
    const [showRequest,setShowRequest]=useState(false);
    
    const [data,setData]=useState(()=>{
      if (typeof(location.state.data)=='object')
      return location.state.data
      else{
      axios.get('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/petId',{headers:{
        authorization:'Bearer '+localStorage.getItem('AccessToken')
      }
        ,params:{animalId:location.state.data.split(" ")[1]}}).then((result)=>{
        console.log("omg",result.data.animal)
         setData(result.data.animal);
      })
    }});
    const [loggedIn, setLoggedIn] = useState(()=>{
      axios.get('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/avatar',{headers:{
        authorization:'Bearer '+localStorage.getItem('AccessToken')
      }})
        .then((res) => setLoggedIn(res.data))
        .catch((err) => {
          console.log(err.response.data);
          setLoggedIn(false)});
    });
    const [saved,setSaved]=useState(null);
    useEffect(()=>{
      axios.get("https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/getSaved",{headers:{
        Authorization:'Bearer ' +localStorage.getItem('AccessToken')}}
    ).then(result=>{
      console.log('result from getsave is',result.data)
        let likedAnimals=[...JSON.parse(result.data)]
        let idArray=[]
        for (let i=0;i<likedAnimals.length;i++){
          idArray.push(likedAnimals[i].id)
        }
        console.log('id array is',idArray)
        setSaved(idArray.includes(String(data.id)))
    })},data)
    return <div>
        <NavBar isLoggedIn={loggedIn}/>
        {data&&<ImageSlider images={data.photos} videos={data.videos}/>}
        {data&&<div className='pet-info'>
          <div><h1>{data.name}</h1><img src={data.gender=='male'?require('../Assets/male.png'):require('../Assets/female.png')}/></div>
          <span>{data.breeds.primary}</span>
          <div><img src={require('../Assets/location.png')}></img><span style={{fontWeight:700}}>{data.contact.address.address1&&data.contact.address.address1+','} {data.contact.address.city}, {data.contact.address.state} {data.contact.address.postcode}</span></div>
          <div><span style={{fontWeight:700}}>Status:&nbsp;</span><span style={data.status=='adoptable'?{color:'green'}:{color:'red'}}> {data.status}</span></div>
          <div><span style={{fontWeight:700}}>Age:&nbsp;</span> <span>{data.age}</span></div>
          <div><span style={{fontWeight:700}}>Size:&nbsp;</span><span>{data.size}</span></div>
          {data.coat&&<div><span style={{fontWeight:700}}>Coat:&nbsp;</span><span>{data.coat}</span></div>}
          {data.description&&<div style={{display:'block'}}>
            <span style={{fontWeight:700}}>Description:</span>
            <p>{data.description}</p>
          </div>}
          <div style={{display:'block'}}>
          <span style={{fontWeight:700}}>Contact</span>
          <br/>
          <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
          <br/>
          <a href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>
          </div>
          <button onClick={saved?handleUnsave:handleSave}>{saved?'Unsave':'Save'}</button>
          {showRequest&&<RequestLogin closeRequest={()=>setShowRequest(false)}/>}
        </div>
        }
        </div>;
}

export default PetProfile;