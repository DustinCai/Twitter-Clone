const db = require('../models');  // same thing as '../models/index'
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next){
    try{  // using async function so wrap in a try catch
      // finding a user
      let user = await db.User.findOne({
        email: req.body.email
      });
      let {id, username, profileImageUrl} = user;

      // checking if their password matches what was sent to the server
      let isMatch = await user.comparePassword(req.body.password);
      if(isMatch){
        let token = jwt.sign(
          {
            id,
            username,
            profileImageUrl
          },
          process.env.SECRET_KEY
        );

        // if it all matches, log them in
        return res.status(200).json({
          id,
          username,
          profileImageUrl,
          token
        });

      } else {
        return next({
          status: 400,
          message: "Invalid Email/Password."
        })
      }
    } catch(err){
      return next({
        status: 400,
        message: "Invalid Email/Password."
      })
    }
}

exports.signup = async function(req, res, next){
  try {
    // Create a user
    let user = await db.User.create(req.body);

    // Create a token (signing a token)
    let {id, username, profileImageUrl} = user;
    let token = jwt.sign(   // passing the payload and the secret
      {
        id,
        username,
        profileImageUrl,
      },
      process.env.SECRET_KEY
    );

    // return a status and a response
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });

  } catch(err){
    // if a validation fails!
    if(err.code === 11000){
      err.message = "Sorry, that username and/or email is taken.";
    }
    return next({
      status: 400,
      message: err.message,
    })
  }
};
