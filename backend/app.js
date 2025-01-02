const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/error.js');

const fivesRoutes = require('./routes/fives-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/fives', fivesRoutes); 

app.use('/api/users', usersRoutes);

app.use(( req, res, next )  => {
  throw new HttpError("Could not find this route", 404);
})


app.use((error, req, res, next) => {
  if(res.headerSent){
    return next(error);
  }
  
  return res.status(error.code || 500).json({message: error.message || "an unknown error ocurred"});
})

app.listen(3000);