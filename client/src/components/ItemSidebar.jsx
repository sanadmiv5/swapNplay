import React, { useEffect, useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import profile from '../images/profile.png';
import moment from 'moment';
import axios from 'axios';
import "../styles/ItemSidebar.css"; // Let's assume we create a CSS file for custom styles

const ItemSidebar = ({ ad }) => {
  const [rating, setRating] = useState(0); // User's rating
  const [message, setMessage] = useState('');
  const [averageRating, setAverageRating] = useState(0); // Average rating
  const [userRating, setUserRating] = useState(null); // Current user's rating if available
  const token = JSON.parse(localStorage.getItem('token'));

  const date = moment(ad.createdAt).format('ll');

  const onStarClick = async (nextValue) => {
    setRating(nextValue);

    try {
      // Make API call to rate the seller
      const response = await axios.post(
        '/api/auth/rate',
        {
          sellerId: ad.userId._id,
          rating: nextValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Rating submitted successfully');
      setAverageRating(response.data.averageRating); // Update average rating after user rates
      setUserRating(nextValue); // Store user's rating after successful submission
    } catch (error) {
      setMessage('Failed to submit rating');
    }
  };

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get(`/api/auth/users/${ad.userId._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const sellerData = response.data.data;

        // Set average rating
        setAverageRating(sellerData.seller.averageRating);

        // Check if the current user has already rated the seller
        if (sellerData.currentUserRating) {
          setUserRating(sellerData.currentUserRating);
          setRating(sellerData.currentUserRating);
        } else {
          setUserRating(null); // No user rating yet
        }
      } catch (error) {
        console.error('Error fetching seller data', error);
      }
    };

    fetchSellerData();
  }, [ad.userId, token]);

  return (
    <div className="item-sidebar-container">
      <div className="details-container">
        <h1 className="item-price">Rs {ad.price}</h1>
        <div className="item-description">{ad.title}</div>
        <div className="item-location">
          <span>{ad.location}</span>
          <span>{moment(ad.createdAt).fromNow()}</span>
        </div>
      </div>

      <div className="seller-container">
        <h2 className="section-title">Seller Description</h2>
        <div className="seller-profile">
          <img src={profile} className="seller-image" alt="profile" />
          <div className="seller-info">
            <span className="seller-name">{ad.userId.name}</span>
            <span className="member-since">Member since {date}</span>
          </div>
        </div>

        <p className="seller-email">
          <strong>Email:</strong> {ad?.userId?.email}
        </p>

        {/* Display average rating */}
        {averageRating !== null && (
          <div className="rating-section">
            <div>Average Rating: {averageRating} / 5</div>
            <StarRatingComponent 
              name="averageSellerRating" 
              starCount={5}
              value={parseFloat(averageRating)} // Show the average rating as stars
              editing={false}
              starColor={"#FFD700"} // Gold color for stars
              emptyStarColor={"#CCCCCC"}
            />
          </div>
        )}

        {/* Star Rating Section */}
        <div className="rating-section">
          <div>Rate the Seller:</div>
          <StarRatingComponent 
            name="sellerRating" 
            starCount={5}
            value={rating}
            onStarClick={onStarClick}
            starColor={"#FFD700"} // Gold color for stars
            emptyStarColor={"#CCCCCC"}
          />
          {message && <p className="rating-message">{message}</p>}
        </div>

        {/* Display user's rating */}
        {userRating !== null && (
          <div className="user-rating">
            <div>Your Rating: {userRating} / 5</div>
          </div>
        )}
      </div>

      <div className="ad-id">AD ID {ad._id}</div>
    </div>
  );
};

export default ItemSidebar;
