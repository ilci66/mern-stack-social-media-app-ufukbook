import Posts from './posts/posts'
import React, { useState, useEffect } from 'react';
import { Form,FormControl,Button } from 'react-bootstrap'

import axios from 'axios';

const Home = () => {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/auth",
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
  return(
    <div>
    <Posts userInfo={userInfo}/>
    </div>
  )
} 

export default Home