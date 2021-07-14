import React, { useState, useEffect} from 'react';
import axios from 'axios'

const Profile = () => {
  const [ resObj, setResObj ] = useState({});

  useEffect(() =>{
    axios.get('http://localhost:5000/user/profile', { withCredentials: true })
      .then(res => setResObj(res))
      .catch(err => console.log(err))
  },[])
  return(
    <div>
      <p>
        {JSON.stringify(resObj)}
      </p>
      Profile
    </div>
    )
} 

export default Profile