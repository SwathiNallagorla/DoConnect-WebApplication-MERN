// routes/messageRoutes.js

const express = require('express');
const router = express.Router();
const {
    sendMessage,
    getMessages,
    getUnreadMessageCount,
    markMessagesAsRead
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

// Define message-related routes
router.post('/messages', protect, sendMessage);
router.get('/messages/:userId', protect, getMessages);
router.get('/messages/unread/:userId', protect, getUnreadMessageCount);
router.post('/messages/mark-read/:userId', protect, markMessagesAsRead);

module.exports = router;
