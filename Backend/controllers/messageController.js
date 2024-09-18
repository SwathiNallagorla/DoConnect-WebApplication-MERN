// controllers/messageController.js

const Message = require('../models/Messages');

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { receiver, content } = req.body;
        const sender = req.user.id;

        const newMessage = new Message({
            sender,
            receiver,
            content,
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
};

// Get messages between the logged-in user and another user
exports.getMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const loggedInUserId = req.user.id;

        const messages = await Message.find({
            $or: [
                { sender: loggedInUserId, receiver: userId },
                { sender: userId, receiver: loggedInUserId },
            ],
        }).sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};

// Get unread message count for the logged-in user
exports.getUnreadMessageCount = async (req, res) => {
    try {
        const count = await Message.countDocuments({ receiver: req.user.id, isRead: false });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching unread messages', error });
    }
};

// Mark messages as read
exports.markMessagesAsRead = async (req, res) => {
    try {
        const { userId } = req.params;

        await Message.updateMany(
            { sender: userId, receiver: req.user.id, isRead: false },
            { $set: { isRead: true } }
        );

        res.status(200).json({ message: 'Messages marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking messages as read', error });
    }
};
