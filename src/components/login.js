import React, { useState } from "react";
import {Link} from 'react-router-dom'
import {Alert} from 'react-bootstrap'
import axios from 'axios'

const Login = () => {
  const [message, setMessage] = useState("")
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const data = {username: loginUsername, password: loginPassword}
  const login = (e) => {
    if(loginUsername === "" || loginPassword === ""){
      return setMessage("Missing required fields")
    }
    axios.post('http://localhost:5000/login', data, {withCredentials: true})
      .then(res => {
        console.log("get response from server")
        console.log(res.data)
        // setMessage("Log in Successful.")
        window.location = '/'
        })
      .catch(error => {
        console.log("got an error from server")
        console.log("catching", error.response)
        setMessage(error.response.data.error)
      })
  // axios({
  //   method: "POST",
  //   data: {
  //     username: loginUsername,
  //     password: loginPassword,
  //   },
  //   withCredentials: true,
  //   url: "http://localhost:5000/login",
  // }).then((res) => {
  //   window.location="/"
  //   console.log("response <<<", res)
  // }).catch(error => {
  //   console.log(error)
  //   setErrorMessage(error.response.data.error)
  // })
};
const handleKeyPress = (event) => {
  if(event.charCode === 13){
    login()
  }
}
  return (
    <div onKeyPress={handleKeyPress}>
        <h1>Login</h1>
        <div className="form-group center-block mx-auto w-50">
        <label>Username</label>
          <input
          className="form-control"
          type="text"
           required
          // placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
         /> 
        <label>Password</label>
          <input
            className="form-control mb-3"
            required
            type="password"
            // placeholder="password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        <div  classname="form-group">
        <input type="submit" value="Enter" className="btn btn-primary" onClick={login}></input>
        </div>
        <p className="mt-4">Don't you have an account? <Link to="/register">Register</Link></p>
        {message != "" && <Alert variant="danger">
          <p>{message}</p>
        </Alert>}
        
        </div>
      </div>
  //something here in the forms breaks the request gonna figure out what
  //probably the submit but we will see
  //   <div>
  //   <h1>Login</h1>
  //   <form onSubmit={login}>
  //     <div className="form-group">
  //       <label>Username</label>
  //         <input
  //         className="form-control"
  //         type="text"
  //         required
  //         // placeholder="username"
  //         onChange={(e) => setLoginUsername(e.target.value)}
  //       />
  //     </div>
  //     <div className="form-group">
  //       <label>Password</label>
  //       <input
  //         className="form-control"
  //         required
  //         type="password"
  //         // placeholder="password"
  //         onChange={(e) => setLoginPassword(e.target.value)}
  //     />
  //     </div>
  //     <div className="form-group">
  //       <input type="submit" value="Enter" className="btn btn-primary" />
  //     </div>
  //   </form>

  //   <p>Don't you have an account? <Link to="/register">Register</Link></p>
  //   <p className="text-danger">{message}</p>
  // </div>
  )
}

export default Login
