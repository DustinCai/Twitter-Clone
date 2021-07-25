const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;  // Promise library

// Connect to our database
//mongoose.connect('mongodb://127.0.0.1:27017/warbler', {
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warbler', {
  keepAlive: true,
});

module.exports.User = require('./user'); //bundling, creating a property for our model to export
module.exports.Message = require('./message'); 
