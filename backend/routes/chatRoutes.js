const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const protect = require('../middleware/authMiddleware');
const Chat = require('../models/Chat');

// Initiate chat when a buy request is made
router.post('/initiate-chat', protect, chatController.initiateChat);

// Endpoint to send a message (optional, if you want to add it now)
router.post('/message/:chatId', protect, chatController.sendMessage);

router.get('/chats',async (req, res) => {
    try {
      const userId = req.user._id; // Assuming req.user is populated with the logged-in user
  
      // Find all chats where the user is either the buyer or seller
      const chats = await Chat.find({
        $or: [
          { buyerId: userId },
          { sellerId: userId },
        ]
      }).populate('buyerId sellerId productId');
  
      res.json({ chats });
    } catch (error) {
      console.error('Error fetching chats:', error);
      res.status(500).json({ message: 'Server error' });
    }
  })

  // Fetch messages for a specific chat
router.get('/chats/:chatId', protect, async (req, res) => {
    const { chatId } = req.params;
  
    try {
      // Find the chat by its ID and populate buyer, seller, and product fields
      const chat = await Chat.findById(chatId).populate('buyerId sellerId productId');
  
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
  
      // Return the chat's messages and additional chat details (if needed)
      res.json({
        chatId: chat._id,
        buyerId: chat.buyerId,
        sellerId: chat.sellerId,
        productId: chat.productId,
        messages: chat.messages,
      });
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;