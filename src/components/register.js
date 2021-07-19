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
    <div className="form-group w-50 mx-auto mt-4 mb-2">
    <label>Username</label>
      <input
        type="text"
        required
        className="form-control"
        // placeholder="username"
        onChange={(e) => setRegisterUsername(e.target.value)}
      />
    </div>
    <div className="form-group w-50 mx-auto mb-2">
    <label>Email</label>
     <input
        required
        className="form-control"
        type="text"
        // placeholder="example@gmail.com"
        onChange={(e) => setRegisterEmail(e.target.value)}
    />    
    </div>
    <div className="form-group w-50 mb-2 mx-auto">
    <label>Password</label>
    <input
      required
      className="form-control"
      type="password"
      // placeholder="password"
      onChange={(e) => setRegisterPassword(e.target.value)}
    />
    </div>
    <div className="form-group w-50 mx-auto mb-4">
    <label>Password again</label>
     <input
        required
        className="form-control"
        type="password"
        // placeholder="same password"
        onChange={(e) => setRegisterPassword2(e.target.value)}
    /> 
    </div>
    
    <button className="btn btn-primary mb-2"onClick={register}>Submit</button>
    <p className="mb-5">
      Do you have an account? <Link to="/login">Login</Link>
    </p>
    {errorMessage !== "" && <p className="alert alert-danger">{errorMessage}</p>}
    <footer className="mt-5">
      <p className="mb-0">Ilker Akbiyik</p>
      <p><a href="https://github.com/ilci66">Github profile</a></p>
    </footer>
  </div>

  )
}

export default Register
