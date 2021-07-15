import React, { useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const data = {username: loginUsername,password: loginPassword,}
  const login = () => {
  axios.post('http://localhost:5000/login', data, {withCredentials: true})
    .then(res => {
      console.log("get response from server")
      console.log(res.data)
      setErrorMessage("Log in Successful.")
      window.location = '/'
      })
    .catch(error => {
      console.log("got an error from server")
      console.log(error.response.data.error)
      setErrorMessage(error.response.data.error)
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
  return (
    <div>
    <h1>Login</h1>
    <form onSubmit={login}>
      <div className="form-group">
        <label>Username</label>
          <input
          className="form-control"
          type="text"
          required
          // placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          type="text"
          required
          type="password"
          // placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
      />
      </div>
      {/* <div className="form-group">
        <input type="submit" value="Enter" className="btn"> </input>
      </div> */}
      <div className="form-group">
        <input type="submit" value="Enter" className="btn btn-primary" />
      </div>
    </form>

    <p>Don't you have an account? <Link to="/register">Register</Link></p>
    <p>{errorMessage}</p>
  </div>
  )
}

export default Login
