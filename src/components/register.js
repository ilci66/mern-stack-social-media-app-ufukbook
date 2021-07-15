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
    <input
      className="form-control"
      placeholder="username"
      onChange={(e) => setRegisterUsername(e.target.value)}
    />
    <input
      className="form-control"
      type="text"
      placeholder="example@gmail.com"
      onChange={(e) => setRegisterEmail(e.target.value)}
    />    
    <input
      className="form-control"
      type="password"
      placeholder="password"
      onChange={(e) => setRegisterPassword(e.target.value)}
    />
    <input
      className="form-control"
      type="password"
      placeholder="same password"
      onChange={(e) => setRegisterPassword2(e.target.value)}
    />
    <button className="btn btn-primary"onClick={register}>Submit</button>
    <p>
      Do you have an account? <Link to="/login">Login</Link>
    </p>
    <p className="">{errorMessage}</p>
  </div>

  )
}

export default Register
