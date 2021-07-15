import React, { useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPassword2, setRegisterPassword2] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  
  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
        password2: registerPassword2,
        email: registerEmail
      },
      withCredentials: true,
      url: "http://localhost:5000/register",
    }).then((res) => {
      console.log(res)
      window.location="/login"
    }).catch(error => {
      console.log(error)
      setErrorMessage(error.response.data.error)
    })
  };
  return (
    <div>
    <h1>Register</h1>
    <div className="form-group">
    <label>Username</label>
      <input
        type="text"
        required
        className="form-control"
        // placeholder="username"
        onChange={(e) => setRegisterUsername(e.target.value)}
      />
    </div>
    <div className="form-group">
    <label>Email</label>
     <input
        required
        className="form-control"
        type="text"
        // placeholder="example@gmail.com"
        onChange={(e) => setRegisterEmail(e.target.value)}
    />    
    </div>

    <div className="form-group"></div>
    <label>Password</label>
    <input
      className="form-control"
      type="password"
      // placeholder="password"
      onChange={(e) => setRegisterPassword(e.target.value)}
    />
    <div className="form-group">
    <label>Password again</label>
     <input
        required
        className="form-control"
        type="password"
        // placeholder="same password"
        onChange={(e) => setRegisterPassword2(e.target.value)}
    /> 
    </div>
    
    <button className="btn btn-primary"onClick={register}>Submit</button>
    <p>
      Do you have an account? <Link to="/login">Login</Link>
    </p>
    <p className="text-danger">{errorMessage}</p>
  </div>

  )
}

export default Register
