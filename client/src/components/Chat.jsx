import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../styles/chat.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Chat = ({ ad }) => {
  const { user } = useSelector((state) => state.auth); // Logged-in user (buyer)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState(null); // For storing chatId
  const navigate = useNavigate()
  const url = '/api/auth'; // Base URL for the API
  const token = JSON.parse(localStorage.getItem('token')); // Get token from localStorage
  const header = {
    Authorization: `Bearer ${token}`, // Authorization header
  };

  // Fetch chat or initiate chat on component mount
  useEffect(() => {
    const fetchOrInitiateChat = async () => {
      try {
        // Initiate or fetch chat using the product ID
        const response = await axios({
          method: 'post',
          url: `${url}/initiate-chat`,
          headers: header,
          data: {
            productId: ad._id, // ID of the product
          },
        });

        setChatId(response.data.chatId); // Store the chat ID

        // Fetch messages for the initiated or existing chat
        const chatMessages = await axios({
          method: 'get',
          url: `${url}/chats/${response.data.chatId}`,
          headers: header,
        });

        setMessages(chatMessages.data.messages); // Set the chat messages
      } catch (error) {
        console.error('Error initiating chat:', error);
      }
    };

    fetchOrInitiateChat();
  }, [ad._id]); // Depend on ad._id to get the seller's product details

  const handleSendMessage = async () => {
    if(!user){
      toast.error("please login to chat")
      return
    }
    if (newMessage.trim() === '') return;

    try {
      const response = await axios({
        method: 'post',
        url: `${url}/message/${chatId}`,
        headers: header,
        data: {
          content: newMessage, // Send the new message
        },
      });

      // Add the new message to the chat window
      setMessages((prevMessages) => [...prevMessages, response.data.chat.messages.pop()]);
      setNewMessage(''); // Clear the input field after sending
      navigate(`/chat/${chatId}`)
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat with {ad.userId.name}</h3> {/* Seller's name */}
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat-message ${msg.sender === user._id ? 'sent' : 'received'}`}
          >
            <p>{msg.content}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
