const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const session = require('express-session')
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();
const routes = require('./routes/routes.js')


//if it doesn't work uncomment 
app.use(bodyParser.json({limit: '16mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '16mb', extended: true }))

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret:"secretcode",
    resave: false,
    saveUninitialized: false,
  })
)
app.use(cookieParser("secretcode"))
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig.js")(passport);
// app.use(passport.initialize());

require('./passportConfig.js')

const port = process.env.PORT ||5000


app.use('/', routes)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
  })
    .then(() => app.listen(port, () => console.log(`Connected to database and listening on port: ${port}`)))
    .catch((err) => console.log(err))