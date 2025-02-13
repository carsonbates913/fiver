const fs = require('fs');
const path = require('path');
const express = require('express');
const checkAuth = require('./middleware/auth');
const bodyParser = require('body-parser');
const HttpError = require('./models/error');
const mongoose = require('mongoose');
require('dotenv').config();


const fivesRoutes = require('./routes/fives-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
})

app.use('/api/users', usersRoutes);

app.use(checkAuth);

app.use('/api/fives', fivesRoutes); 

app.use(( req, res, next )  => {
  throw new HttpError("Could not find this route", 404);
})

app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }

  console.log(error.message);
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose.connect(process.env.MONGO_PASSWORD)
  .then(() =>
    app.listen(process.env.PORT || 3000))
  .catch((error) => {
    console.log(error);
  });
