import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


const Profile = () => {
  const [data, setData] = useState(null);

    useEffect(() => {
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/user/profile",
      }).then((res) => {
        console.log(res.data);
        if(res.data) setData(res.data)
        else if(!res.data){
          console.log("no data came through")
          // window.location="/login"
        }
      }).catch(error => {
        console.log("some error occured", error)
        // window.location="/login"
      })
    },[])
    
  
  return (
  <div> 
    <h2 className="mb-5">Hello!</h2>
    {data ? <p className="mb-2">Welcome back <b>{data.username}</b> <br></br> Your email adress: <b>{data.email}</b> <br></br>
    Your membership was created <b><ReactTimeAgo date={data.createdAt} locale="en-US"/></b><br></br>
    and created <b>{data.postedCount}</b> posts.</p>  : "Loading..."}

  </div>

  )
}

export default Profile
