const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport');
const isEmpty = require('is-empty')
// the .Stratefy is very important 
const LocalStrategy = require('passport-local').Strategy
 
const User = require('../models/user.js');
const Post = require('../models/post.js');

router.post('/register', (req, res) => {

  const { username, password, password2, email } = req.body;
  console.log(username, password, "what ",email)
  if(password !== password2){
    return res.status(400).json({error: "Passwords need to be identical"})
  }
  if(isEmpty(username) || isEmpty(password) || isEmpty(password2) || isEmpty(email)){
    return res.status(400).json({ error: "Missing required fields!"})
  }
  User.findOne({username: username}, (err, data) => {
    if(err){
      return res.status(400).json({ error: `An error occured: ${err}`})
    }else if(data){
      return res.status(400).json({ error: "Username already taken" })
    }else{
      const newUser = new User({
        username : req.body.username,
        password: req.body.password,
        email: req.body.email
      });
      console.log(newUser.password)
      bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err){ return res.status(400).json(`error: ${err}`) }
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              console.log("registered new user")
              res.status(201).json(user)
            })
            .catch(error => console.log(error))
        })
      })
    }
  })
})


// router.post('/login', (req, res, next) => {
//   const { username, password } = req.body;
//   User.findOne({ username: username }, (err, data) => {
//     if(err){return res.status(400).json({error: err})}
//     else if(!data){ return res.json({error: "Unknown user name"})} 
//     else{
//       bcrypt.compare(password, data.password)
//         .then(result => {
//           if(result){return res.status(200).json(data)}
//           else{return res.status(400).json({error: "Wrong password"})}
//         })
//         .catch(err => console.log(err))
//     }
//   })
// })

//now the tricky part,
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err){ return res.status(400).json({error: "An error occured while logging in"})}
    // if(err) throw err;
    if(!user){ return res.status(400).json({error: "Unknown user or password"})}
    // if (!user) res.send("No User Exists");
    else{
      req.logIn(user, (err) => {
        // if (err) throw err;
        if (err) {return res.status(400).json({error: "login error"})};
        res.send("Successfully Authenticated");
        console.log("backend user>>>>", req.user);
      });
      // req.logIn(user, (err) => {
      //   if(err) return res.status(400).json({error: "Another error occured while loggin in"})
      //   // console.log("here", req.user, typeof req.user)
      //   user.isAuthenticated = true;
      //   return res.status(200).json(req.user)
      //   //maybe return done(null, user);
      //   //try the one above after your break
      //   // return done(null, user)
      //   // res.status(200).send("authentication successful")
      // })
    }
  })(req, res, next)
})


router.get('/posts', (req, res) => {

})
router.get('/profile', (req, res) => {
  console.log(req.isAuthenticated())
  res.send(req.user)
  console.log(req.user)

})
router.get('/user', (req, res) => {
  res.send(req.user)
})
router.get('/logout', (req, res) => {
  console.log("wanna logout")
  req.logout();
  res.redirect("/")
})
module.exports = router