const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors')
require('dotenv').config();
const routes = require('./routes/routes.js')

const app = express();
//if it doesn't work uncomment 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(cors()
);

app.use(
  session({
    secret:process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(cookieParser(process.env.SECRET_CODE))
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig.js")(passport);

// app.use(passport.initialize());

require('./passportConfig.js')

const port = process.env.PORT ||5000


app.use('/user', routes)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useFindAndModify: false})
    .then(() => app.listen(port, () => console.log(`Connected to database and listening on port: ${port}`)))
    .catch((err) => console.log(err))