const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String,
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message", 
  }]
});

// Hashing a password
userSchema.pre('save', async function(next){
  try {
    if(!this.isModified('password')){
      return next();  // if the password is not changed, don't hash it again, just move on
    }
    let hashedPassword = await bcrypt.hash(this.password, 10); // hash is sync so await it
    this.password = hashedPassword;
    return next();
  } catch(err) {
    return next(err); // passing err to next will go to our error handler
  }
});

// Instance Method
userSchema.methods.comparePassword = async function(candidatePassword, next){
  try {
    // 'this' refers to the individual document
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch(err) {
    return next(err);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
