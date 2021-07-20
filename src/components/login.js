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
        window.location = '/'
        })
      .catch(error => {
        console.log("got an error from server")
        console.log("catching", error.response)
        setMessage(error.response.data.error)
      })
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
          onChange={(e) => setLoginUsername(e.target.value)}
         /> 
        <label>Password</label>
          <input
            className="form-control mb-3"
            required
            type="password"
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
  )
}

export default Login
