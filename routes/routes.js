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
  // console.log(username, password, "what ",email)
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
        email: req.body.email,
        postedCount:0
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

router.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if(err) throw err;
    if(!user){ 
      console.log("this be the info", info.error)
      return res.status(401).json(info)
    }
    else{
      req.logIn(user, (err) => {
        if (err) throw err;
        // if (err) {return res.status(400).json({error: "login error"})};
        res.status(200).send("Successfully Authenticated");
        console.log("backend user>>>>", req.user);}
      );
    }
  })(req, res, next)
})


router.get('/posts', (req, res, next) => {
  console.log("attempted to get posts")  
  Post.find({}, (err, data) => {
  if(err) throw err;
  else if(!data) res.status(400).json({error: "There are no posts to show"})
  else{
    res.status(200).json(data)
  }
})
})
router.delete('/delete', (req, res) => {
  // console.log("comes here<<<<<")
  const { title, creator } = req.body
  // console.log("these are the stuff<<<<<<<", title, creator)
  Post.findOneAndRemove({title:title}, (err, data) => {
    if(err) throw err
    if(!data) res.status(400).json({error: "no data found"})
    else{
      res.status(204).json({message:"successfully deleted"})
      console.log("deletion successfull")
      User.findOneAndUpdate({username: creator},{$inc : {'postedCount' : -1}}, {new:true}).exec((err, data) => {
        if(err)throw err
        else if(!data) res.status(400).json({error: "no data found"})
        else{ console.log("successfully decremented") }
      })
    }
  })
})
router.post('/post/create', (req, res) => {
  if(req.isAuthenticated()){
    const {image, creator, title, postInfo} = req.body
      // console.log("this is the image", image)
      if(isEmpty(postInfo) || isEmpty(title)){
        return res.status(400).json({ error: "Missing required fields"})
      }
      Post.findOne({title: title}, (err, data) => {
        if(err) throw err
        else if(data) {
          return res.status(400).json({error: "There's already a post with the same title!"})
        }else{
          const newPost = new Post({
            image: image,
            creator: creator,
            title: title,
            postInfo: postInfo,
            likes:[]
          })
          // console.log(newPost.image)
          newPost.save()
            .then(post => {
            console.log(post)
            res.status(201).send("successfully created")
            User.findOneAndUpdate({username: creator},{$inc : {'postedCount' : 1}}, {new:true}).exec((err, data) => {
              if(err)throw err
              else if(!data) res.status(400).json({error: "no data found"})
              else{ console.log("successfully incremented") }
            })
            })
            .catch(error => {console.log(error)})
    }
  })}
})
// router.post('/post/like', (req, res) => {
//   const {username, id} = req.body
//   console.log("is it real" ,mongoose.Types.ObjectId.isValid(id))
//   if(isEmpty(username)){return res.status(400).json({error: "Please login"})}
//   console.log(id, username)
//   Post.findOne({_id:id}, (err, data) => {
//     if(err) throw err
//     else if(!data) res.status(400).json({error: "no data"})
//     else{
//       if(data.likes.indexOf(username) >= 0 ){
//         console.log("here I am")
//         //maybe async will fix the weird error I sometimes get try it
//         // const dislike = () => {

//         // }
//         data.likes = data.likes.filter(name => name != username)
//         data.save((err, data))
//         res.json({message: "disliked"})
//       }else{
//         console.log('there be me')
//         data.likes.push(username)
//         data.save()
//         res.json({message: "liked"})
//       }
//     }
//   })

// })  
router.get('/auth', (req, res) => {
  console.log(req.isAuthenticated())
  res.send(req.user)
  console.log(req.user)
})
router.get('/user/profile', (req, res) => {
  if(!req.isAuthenticated()){
    return res.status(400).json({error: "Unauthorized attempt"})
  }
  // res.send(req.user)
  console.log(req.user)
  User.findOne({username: req.user.username}, (err, user) => {
    if(err) throw err
    else if(!user) res.status(404).json({error: "no data found"})
    else{ res.status(200).json(user) }
  })
})

router.get('/logout', (req, res) => {
  console.log("wanna logout")
  req.logout();
  res.redirect("/")
})
module.exports = router