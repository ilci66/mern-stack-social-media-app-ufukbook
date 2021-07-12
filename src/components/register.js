import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [ username, setUsername ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ password2, setPassword2 ] = useState("")
  const [ message, setMessage ] = useState("")

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  } 
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(password !== password2){
    //   return setMessage("Passwords need to match!")
    // }
    const newUser = {
      username: username,
      email: email,
      password: password, 
      password2: password2
    }

    console.log(newUser)

    axios.post('http://localhost:5000/user/register', newUser)
    .then(res =>{
      console.log(res.data)
      setMessage("Account succesfully registered.")
      window.location = '/login';
      })
    .catch(error => {
      console.log(error)
      console.log(error.response.data.error)
      setMessage(error.response.data.error)
    })

  }
  return(
    <div>
      <h3>
        Register
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
        <label>Email:</label>
        <input type="text"
            required
            className="form-control"
            name="email"
            value={email}
            onChange={handleEmailChange}
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
        <label>Password (the same one) :</label>
        <input type="text"
            required
            className="form-control"
            value={password2}
            name="password2"
            onChange={handlePassword2Change}
            >
          </input>
        </div>
        <div className="form-group">
          <input type="submit" value="Register" className="btn btn-primary" />
        </div>
      </form>
      <p>Do you have an account?<a href="/login">Login</a></p>
    </div>
  )
}

export default Register