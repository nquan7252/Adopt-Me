import axios from "axios"
export default function isLoggedIn(){
    return axios.get('http://localhost:3001/authenticate',{headers:{
      Authorization:'Bearer '+localStorage.getItem('AccessToken')
  }})
}