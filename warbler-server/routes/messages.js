const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams so we have access to /:id

const { createMessage, getMessage, deleteMessage } = require('../handlers/messages');

// prefix - /api/users/:id/messages
router.route('/').post(createMessage);

// prefix - /api/users/:id/messages/:message_id
router.route('/:message_id')
      .get(getMessage)
      .delete(deleteMessage);

module.exports = router;
