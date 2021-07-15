// import React, { useState, useEffect} from 'react';
// import axios from 'axios'

// const Profile = () => {
//   const [ resObj, setResObj ] = useState({});

//   useEffect(() =>{
//     axios({
//       method: "GET",
//       withCredentials: true,
//       url: 'http://localhost:5000/user/profile',
//     }).then((res) => {
//       setResObj(res.data);
//       console.log(res.data);
//     });
//   },[])
//   return(
//     <div>
//       <p>
//         {JSON.stringify(resObj)}
//       </p>
//       Profile
//     </div>
//     )
// } 

// export default Profile
import React, { useState } from "react";
import axios from 'axios'

const Profile = () => {
  const [data, setData] = useState(null);
  const Profile = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/profile",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };
  return (
  <div> 
    <h1>Get User</h1>
    <button onClick={Profile}>Submit</button>
    {data ? <h1>Welcome Back {data.username}</h1> : null}
  </div>

  )
}

export default Profile
