require('dotenv').config();
const jwt = require('jsonwebtoken');

// make sure the user is logged in - authentication
exports.loginRequired = function(req, res, next){
  try {
    // headers.authorization usually comes first with a realm, space, and then the entire token
    const token = req.headers.authorization.split(" ")[1];  // get the token
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
      if(decoded){
        return next();
      } else {
        return next({ status: 401, message: "Please log in first" });
      }
    });

  } catch(err) {
    return next({ status: 401, message: "Please log in first", });
  }
}; 

// make sure we get the correct user - authorization
exports.ensureCorrectUser = function(req, res, next){
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){ // SECRET_KEY is important for encoding and decoding
      // if there is a token and the token's id is the same as the token in the url, then allow the user to move on
      if(decoded && decoded.id === req.params.id){
        return next();
      } else {
        return next({ status: 401, message: 'Unauthorized' });
      }
    });
  } catch(err){
    return next({ status: 401, message: 'Unauthorized' });
  }
};
