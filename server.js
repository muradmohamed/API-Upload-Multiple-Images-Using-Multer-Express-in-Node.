const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const morgan = require("morgan");
const userRoutes = require('./routes/users')
var path = require('path'); 



const app = express();
const PORT = process.env.PORT || 3000;

// EJS
app.set('view engine', 'ejs');


app.use('/uploads', express.static('uploads'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//User Routes
app.use("/", userRoutes);
app.get('/', (req, res) => res.render('index'));



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


  module.exports = app;