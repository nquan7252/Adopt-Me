import axios from 'axios';

import React, { Component, useState } from 'react';
import NavBar from '../Components/NavBar';
import { useEffect } from 'react';
import Card from '../Components/Card';
import './UserPage.css'
import isLoggedIn from '../Helper/isLoggedIn';
import SelectionBar from '../Components/SelectionBar';
import UnsaveSuccessBanner from '../Components/UnsaveSuccessBanner';
import { useLocation } from 'react-router-dom';
function UserPage() {
    const location=useLocation();
    const handleLogout=()=>{
        localStorage.removeItem('AccessToken');
        window.location.href='/logoutSuccess'
    }
    const [active,setActive]=useState(()=>{
        console.log('location state ',location.state)
         if(location.state.chosen=='profile')
        return 'profile'
        return 'favorites'
    })
    const handleSwitch=(e)=>{
        e=='profile'?setActive('profile'):setActive('favorites');
    }
    const [showUnsaveSuccess,setShowUnsaveSuccess]=useState(false)
    const [loggedIn, setLoggedIn] = useState(async()=>{
        axios.get('http://localhost:3001/avatar',{headers:{
          authorization:'Bearer '+localStorage.getItem('AccessToken')
        }})
          .then((res) => setLoggedIn(res.data))
          .catch((err) => {
            console.log(err.response.data);
            setLoggedIn(false)});
      });
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
      let index;
      for (let obj of arr){
          if (obj.id==data.id)
          index=arr.indexOf(obj)
      }
      arr.splice(index,1)
      
      return arr
    })
    axios.get('http://localhost:3001/unsave',{headers:{
    authorization:'Bearer '+ localStorage.getItem('AccessToken')},
    params:{
    animalId:data.id,
    animalName:data.name,
    //if the photo does not exist?
    animalPhoto:data.photo,
    animalGender:data.gender,
    animalLocation:data.location,
    animalBreed:data.breed
}}).then(()=>{setShowUnsaveSuccess(true)
setTimeout(()=>setShowUnsaveSuccess(false),2000)
})

  }
const checkSave=(id)=>{
    //CHANGE THIS SINCE ITS AN ARRAY OF OBJECTS 
    if (saved!=null){
        for (let obj of saved)
        if(obj.id==id)return true;
    }
    return false;
  }
    const [saved,setSaved]=useState(()=>{
        axios.get('http://localhost:3001/getSaved',{headers:{
            Authorization:'Bearer '+localStorage.getItem('AccessToken')
        }}).then(result=>{
            console.log('result from saved is',JSON.parse(result.data))
            setSaved(JSON.parse(result.data))})
    })
    const [user,setUser]=useState(()=>{
        if (localStorage.getItem('AccessToken')){
        axios.get('http://localhost:3001/user',{
            headers:{
                Authorization:'Bearer '+localStorage.getItem('AccessToken')
            }
        }).then(res=>{console.log(res.data[0])
            setUser(res.data[0])}).catch(console.log)
    }
    else{
        //navigate
        window.location.href='/'
    }
});
    return<>
    {showUnsaveSuccess&&<UnsaveSuccessBanner/>}
    <NavBar isLoggedIn={loggedIn}/>
    <SelectionBar active={active} onClick={handleSwitch}/>
     <div>Hello{user?.name}</div>
     {active=='profile'?<button onClick={handleLogout}>Log out</button>:
     <div className='favorite-section'>
     {saved?saved.map((element,index)=><Card fromUser={true} location={element.location} breed={element.breed} image={element.photo} isSaved={checkSave(element.id)} unsave={handleUnsave} save={handleSave} key={element.id} loggedIn={loggedIn} data={element}></Card>):<div>Nothing here</div>}
    </div>
    }
     </>
  }

export default UserPage;