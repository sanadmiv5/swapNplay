import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../styles/singlechat.css";

const SingleChat = () => {
  const { chatId } = useParams(); // Get the chat ID from the URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const user = JSON.parse(localStorage.getItem("userDetails")); // Get logged in user from localStorage
  const url = '/api/auth'; // Base URL for API
  const token = JSON.parse(localStorage.getItem('token')); // Get token from localStorage
  const header = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch chat messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${url}/chats/${chatId}`, { headers: header });
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };
    fetchMessages();
  }, [chatId, header]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Don't send empty messages

    try {
      const response = await axios.post(
        `${url}/message/${chatId}`,
        { content: newMessage },
        { headers: header }
      );

      // Update the messages with the newly sent message
      setMessages(response.data.chat.messages);
      setNewMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg?._id} className={`chat-message ${msg?.sender === user._id ? 'sent' : 'received'}`}>
              <p>{msg?.content}</p>
              <small>{msg?.timestamp && new Date(msg?.timestamp).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
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

export default SingleChat;
