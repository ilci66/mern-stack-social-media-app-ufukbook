import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogIn = () => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ message, setMessage ] = useState("")

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  } 
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = (e) => {
    (e).preventDefault()

    console.log("pushed the login button")

    const userToCheck = {
      username: username,
      password: password
    }
    axios.post('http://localhost:5000/user/login', userToCheck)
    .then(res => {
      console.log("get response from server")
      console.log(res.data)
      setMessage("Log in Successful.")
      window.location = '/'
      })
    .catch(error => {
      console.log("got an error from server")
      console.log(error.response.data.error)
      setMessage(error.response.data.error)
    })
  }
  return(
    <div>
    <h3>
      Log In
    </h3>
    <p>{message}</p>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username:</label>
        <input type="text"
          required
          className="form-control"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          >
        </input>
      </div>
      <div className="form-group">
      <label>Password:</label>
      <input type="text"
          required
          className="form-control"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          >
        </input>
      </div>
      <div className="form-group">
        <input type="submit" value="Enter" className="btn btn-primary" />
      </div>
    </form>
    <p>Don't you have an account? <a href="/register">Register</a></p>
  </div>
    )
} 

export default LogIn