
//environment configuration
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const passport = require('passport');

//import i18n
const i18n = require("./src/i18n/i18n");


//set port
const port = process.env.PORT || 4000;

//create express app
const app = express();

//app configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
)
app.use(i18n);
app.use(passport.initialize())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  next();
});

require('./src/models/index')

//import routes
const indexRoute = require('./src/routes');
app.use('/', indexRoute)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
