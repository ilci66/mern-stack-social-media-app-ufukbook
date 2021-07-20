import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";


import About from './components/about'
import Home from './components/home'
import NavBar from './components/navbar'
import Register from './components/register'
import Login from './components/login'
import Profile from './components/profile'
import Posts from './components/posts/posts'
import Post from './components/posts/post/post.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"> 
            <NavBar />
            <Home />
          </Route>
          <Route exact path="/about">
            <NavBar />
            <About />
          </Route>
          <Route exact path="/register"><Register /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/profile">
            <NavBar />
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
