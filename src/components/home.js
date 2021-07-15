import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/profile",
    }).then((res) => {
      console.log(res.data);
      if(res.data) setUserInfo(res.data)
      else if(!res.data){
        window.location="/login"
      }
    }).catch(error => {
      console.log(error)
      window.location="/login"
    })
  },[])

  const handleLogout = (e) => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/logout",
    })
    .then(res => {
      console.log(res)
      window.location= "/login"
    })
    .catch(error => console.log(error))
    window.location="/login"
  }
  return(
    <div>
    <p>Hello{userInfo.username}</p>
    <a className="btn btn-secondary" href="/profile">go to profile</a>
    <button className="btn btn-primary"onClick={handleLogout}>logout</button>
    Home
    </div>
  )
} 

export default Home