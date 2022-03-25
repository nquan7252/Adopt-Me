import axios from "axios"
export default function isLoggedIn(){
    return axios.get('https://38bh94g0c4.execute-api.us-east-1.amazonaws.com/dev/authenticate',{headers:{
      Authorization:'Bearer '+localStorage.getItem('AccessToken')
  }})
}