import React, { useState } from 'react';
import { Card, IconButton, Button, Menu, MenuItem } from '@mui/material';
import { BsThreeDots } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { approveSwap, deleteAd } from '../redux/ads/adsSlice';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const MySwaps = ({ ad }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fromProductId, toProductId, status, createdAt } = ad;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditBtnClick = () => {
    navigate(`/update/item/${ad._id}`, { state: ad });
  };

  const handleApprove = () => {
    dispatch(approveSwap({ id: ad._id, data: { status: 'approved' } }));
    console.log('Swap approved for', ad._id);
  };

  // Function to determine the color based on the status
  const getStatusColor = (status) => {
    switch (status) {
      case 'requested':
        return 'blue';
      case 'pending':
        return 'orange';
      case 'approved':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <Card style={{ cursor: 'pointer', margin: '10px 0' }}>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: 1 }}>
          <p><strong>Swap Requested:</strong> {moment(createdAt).format('LL')}</p>
          
          {status === 'pending' && (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleApprove}
            >
              Approve
            </Button>
          )}
        </div>
        <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
          <img
            src={fromProductId?.imageUrl}
            alt={fromProductId?.title}
            width={50}
            height={50}
            style={{ marginRight: '15px' }}
          />
          <p>
            {fromProductId?.title} <strong>→</strong> {toProductId?.title}
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <p style={{ color: getStatusColor(status) }}>
            <strong>Status:</strong> {status}
          </p>
          {/* <IconButton onClick={handleClick}>
            <BsThreeDots />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          >
            <MenuItem onClick={handleEditBtnClick}>Edit</MenuItem>
            <MenuItem onClick={() => dispatch(deleteAd(ad._id))}>Delete</MenuItem>
          </Menu> */}
        </div>
      </div>
    </Card>
  );
};

export default MySwaps;
