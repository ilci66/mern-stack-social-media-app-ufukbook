import React, { useState, useEffect} from 'react';
import axios from 'axios'

const Profile = () => {
  const [ isAuth, setIsAuth ] = useState(false)
  useEffect(() =>{
    axios.get('http://localhost:5000/user/profile')
      .then(res => setIsAuth(res))
      .catch(err => console.log(err))
  },[])
  return(
    <div>
      <p>
        {JSON.stringify()}
        {JSON.stringify(isAuth.data)}
      </p>
      Profile
    </div>
    )
} 

export default Profile