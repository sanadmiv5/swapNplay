import React from 'react';
import { FaTag, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa';

const ItemDetails = ({ ad }) => {
  return (
    <div className="details_container">
      <h4 className="title">Details</h4>
      <div className="items">
        <div className="item">
          <FaMoneyBillWave className="icon" />
          <p className="attribute">Price</p>
          <p className="value">Rs {ad.price}</p>
        </div>
      </div>

      <hr />

      <div className="description_container">
        <h4 className="title"><FaInfoCircle className="icon" /> Description</h4>
        <p className="description">{ad.description}</p>
      </div>
    </div>
  );
};

export default ItemDetails;
