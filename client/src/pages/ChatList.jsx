import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import profile from "../images/profile.jpg";
import moment from 'moment';
import '../styles/chatList.css';  // Assuming you're using a separate CSS file for styling

const ChatList = () => {
  const { user } = useSelector((state) => state.auth);
  const [chats, setChats] = useState([]);

  const url = '/api/auth';
  const token = JSON.parse(localStorage.getItem('token'));
  const header = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${url}/chats`, { headers: header });
        setChats(response.data.chats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="chat-list-container">
      <h3 className="chat-list-title">Your Chats</h3>
      {chats.length > 0 ? (
        <ul className="chat-list">
          {chats.map((chat) => (
            <li key={chat._id} className="chat-item">
              <Link to={`/chat/${chat._id}`} className="chat-link">
                <div className="chat-avatar">
                  <img
                    src={user.picture ? user.picture : profile}
                    alt="profile"
                    className="chat-profile-pic"
                  />
                </div>
                <div className="chat-details">
                  <p className="chat-username">
                    {chat.buyerId._id === user._id
                      ? chat.sellerId.name
                      : chat.buyerId.name}
                  </p>
                  <p className="chat-last-message">
                    {chat.messages.length > 0
                      ? chat.messages[chat.messages.length - 1].content
                      : 'No messages yet'}
                  </p>
                </div>
                <div className="chat-timestamp">
                  {chat.messages.length > 0
                    ? moment(chat.messages[chat.messages.length - 1].timestamp).fromNow()
                    : ''}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats found.</p>
      )}
    </div>
  );
};

export default ChatList;
