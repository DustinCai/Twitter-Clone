require("dotenv").config();   // Load environment variables

// Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Handlers
const errorHandler = require('./handlers/error');

// Routes
const authRoutes = require('./routes/auth');
const messagesRoute = require('./routes/messages');

// Middleware
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');

const db = require("./models");

const PORT = process.env.PORT || 8081; 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// All my routes here
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, messagesRoute);
app.use('/api/messages', loginRequired, async function(req, res, next){
  try {
    // once the user is logged in, show all the sorted messages of every single user,
    // populate is going to give us the entire user obj, but we just want the username & profileImageUrl
    let messages = await db.Message.find().sort({ createdAt: 'desc' }).populate('user', {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(messages);
  } catch(err) {
    return next(err);
  }
});

// Error handling
app.use(function(req, res, next){
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
  console.log(`Server is starting on port ${PORT}`);
})
