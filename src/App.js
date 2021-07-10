import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import About from './components/about'
import Home from './components/home'
import Navbar from './components/navbar'
import Register from './components/register'
import LogIn from './components/login'
import Posts from './components/posts/posts'
import Post from './components/posts/post/post.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/posts">
            <Navbar />
            <Posts />
          </Route>
          <Route exact path="/"> 
            <Navbar />
            <Home />
          </Route>
          <Route exact path="/about">
            <Navbar />
            <About />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/:id">
            <Post /> 
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
