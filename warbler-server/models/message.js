const mongoose = require('mongoose');
const User = require('./user');   // bring in user because we want every msg to have a ref to the user

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 160
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,   // objectid for some user
      ref: 'User',    // reference to the user model, case sensitive, must match to the name of your model
    }
  },
  {
    timestamps: true
  }
);

// when a message is deleted, also delete the message from the user model
// don't make an arrow function because we need the correct value of 'this'
messageSchema.pre('remove', async function(next){
  try {
    let user = await User.findById(this.user);  // find the user by passing the user object
    user.messages.remove(this.id);  // remove the id of the message from their messages list
    await user.save();              // save that user
    return next();                  // return next
  } catch(err){
    return next(err);
  }
})

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
