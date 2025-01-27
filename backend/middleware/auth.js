const HttpError = require('../models/error');
const jsonwebtoken = require('jsonwebtoken');

module.exports = async(req, res, next) => {
  if(req.method === 'OPTIONS') {
    return next();
  }
  try {
    token = req.headers.authorization.split(' ')[1];
    if(!token) {
      throw new Error;
    }
    const decryptedToken = jsonwebtoken.verify(token, process.env.JWT_KEY);
    req.userData = {userId: decryptedToken.userId};
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed", 401));
  }
}