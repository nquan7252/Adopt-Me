import axios from 'axios';

import React, { Component, useState } from 'react';
import NavBar from '../Components/NavBar';
import { useEffect } from 'react';
import Card from '../Components/Card';
import { Link } from 'react-router-dom';
import './UserPage.css'
import isLoggedIn from '../Helper/isLoggedIn';
import SelectionBar from '../Components/SelectionBar';
import UnsaveSuccessBanner from '../Components/UnsaveSuccessBanner';
import { useLocation } from 'react-router-dom';
import AvatarChooser from '../Components/AvatarChooser';
import AvatarChanger from '../Components/AvatarChanger';
function UserPage() {
    const location=useLocation();
    const [avatar,setAvatar]=useState(null);
    const [showChangeAva,setShowChangeAva]=useState(false);
    const handleLogout=()=>{
        localStorage.removeItem('AccessToken');
        window.location.href='/logoutSuccess'
    }
    const [active,setActive]=useState(()=>{
         if(location.state.chosen=='profile')
        return 'profile'
        return 'favorites'
    })
    const handleSwitch=(e)=>{
        e=='profile'?setActive('profile'):setActive('favorites');
    }
    const [showUnsaveSuccess,setShowUnsaveSuccess]=useState(false)
    const [loggedIn, setLoggedIn] = useState(async()=>{
        axios.get('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev//avatar',{headers:{
          authorization:'Bearer '+localStorage.getItem('AccessToken')
        }})
          .then((res) => {setLoggedIn(res.data)
        setAvatar(res.data)
        })
          .catch((err) => {
            console.log(err.response.data);
            setLoggedIn(false)});
      });
  const handleSave=(data)=>{
    setSaved(prev=>[...prev,String(data.id)]);
    axios.get('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev//save',{headers:{
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
    axios.get('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev//unsave',{headers:{
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
  const handleChangeAva=()=>{
    setShowChangeAva(true);
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
        axios.get('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/getSaved',{headers:{
            Authorization:'Bearer '+localStorage.getItem('AccessToken')
        }}).then(result=>{
            setSaved(JSON.parse(result.data))})
    })
    const [user,setUser]=useState(()=>{
        if (localStorage.getItem('AccessToken')){
        axios.get('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/user',{
            headers:{
                Authorization:'Bearer '+localStorage.getItem('AccessToken')
            }
        }).then(res=>{
            setUser(res.data[0])}).catch(console.log)
    }
    else{
        //navigate
        window.location.href='/'
    }
});
    return <>
    
    {showUnsaveSuccess&&<UnsaveSuccessBanner/>}
    
    <NavBar isLoggedIn={loggedIn} avatar={avatar}/>
    <SelectionBar active={active} onClick={handleSwitch}/>
    {showChangeAva&&<AvatarChanger/>}
     {active=='profile'?<div className='profile-section'>
         <div>
             <img src={avatar!=null?require('../Assets/'+avatar):''}></img>
             {user&&<div style={{display:'block'}}>
                 <h3>{user.name}</h3>
                <h5>Email: {user.username}</h5>
                <h5>Saved pets: {saved?saved.length:'0'}</h5>
                <Link to={'/reset-password/'+localStorage.getItem('AccessToken')}>Reset password</Link>
             </div>
            }
             <button onClick={handleLogout}>Log out</button>

        </div>
         </div>:
     <div className='favorite-section'>
     {saved?saved.map((element,index)=><Card fromUser={true} location={element.location} breed={element.breed} image={element.photo} isSaved={checkSave(element.id)} unsave={handleUnsave} save={handleSave} key={element.id} loggedIn={loggedIn} data={element}></Card>)
     :<div><h3>Your list is empty</h3>
     <Link to="/search/1?location=&#38;type=&#38;coat=&#38;color=&#38;gender="><button>Find a pet</button></Link>
     </div>}
    </div>
    }
    
     </>
  }

export default UserPage;