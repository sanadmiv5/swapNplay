import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Hero = () => {
  const { user } = useSelector((state) => state.auth); // Get user state
  const navigate = useNavigate();

  // Handle Chat and Post Clicks
  const handleChatClick = () => {
    if (user) {
      navigate('/chatList');
    } else {
      alert('Please login to chat.');
    }
  };

  const handlePostAdClick = () => {
    if (user) {
      navigate('/post');
    } else {
      alert('Please login to post an ad.');
    }
  };

  return (
    <div className="hero-wrapper">
      {/* First Section: SwapNPlay */}
      <div className="hero-section" style={{ backgroundColor: '#f0f8ff' }}>
        <div className="hero-content">
          <h1 className="hero-heading">SwapNPlay</h1>
          <p className="hero-description">
            Discover toys from everywhere and play with the toy you need.
          </p>
        </div>
        <div className="hero-image">
          <img src="/uploads/hero2.png" alt="Toys" className="image-responsive" />
        </div>
      </div>

      {/* Second Section: Chat Feature */}
      <div className="hero-section" style={{ backgroundColor: '#ffe4e1' }}>
      <div className="hero-image">
          <img src="/uploads/hero3.png" alt="Chat" className="image-responsive" />
        </div>
        <div className="hero-content">
          <h2 className="hero-heading">Start a Chat</h2>
          <p className="hero-description">
            Want to chat with a seller? Connect easily through our chat feature!
          </p>
          <Button onClick={handleChatClick} className="hero-btn chat-btn">
            Chat Now
          </Button>
        </div>
      </div>

      {/* Third Section: Post an Ad */}
      <div className="hero-section" style={{ backgroundColor: '#e6e6fa' }}>
        <div className="hero-content">
          <h2 className="hero-heading">Post Your Ad</h2>
          <p className="hero-description">
            Have a toy to sell or give away? Post your ad easily and reach buyers!
          </p>
          <Button onClick={handlePostAdClick} className="hero-btn post-btn">
            Post an Ad
          </Button>
        </div>
        <div className="hero-image">
          <img src="/uploads/hero4.png" alt="Post Ad" className="image-responsive" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
