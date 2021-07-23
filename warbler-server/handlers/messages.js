const db = require('../models/index');  // bring in all our models

exports.createMessage = async function(req, res, next){
  try {
    // create a message
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });

    // find the user associated to the msg, push the message, & save
    let foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message.id);
    await foundUser.save();

    // send back the message with the user's data (username & profileImageUrl)
    let foundMessage = await db.Message.findById(message._id).populate('user', {
      username: true,
      profileImageUrl: true
    });  // populate the user property with just the username and profileImageUrl

    return res.status(200).json(foundMessage);

  } catch(err) {
    return next(err);
  }
};

// GET /api/users/:id/messages/:message_id
exports.getMessage = async function(req, res, next){
  try {
    let message = await db.Message.find(req.params.message._id);
    return res.status(200).json(message);
  } catch(err){
    return next(err);
  }
};

// DELETE /api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next){
  // findByIdAndRemove won't work here because in our message model, we have a pre remove hook and it doesn't work with findByIdAndRemove
  // so we can't use that method and instead, just use the remove method
  try {
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove()
    return res.status(200).json(foundMessage);
  } catch(err){
    return next(err);
  }
};
