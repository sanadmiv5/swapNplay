import { IconButton, Menu, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAd, addGiveaway, selectWinner } from '../redux/ads/adsSlice';
import moment from 'moment';

const MyAd = ({ ad }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedWinner = useSelector((state) => state.ads.selectedWinner);

  const { title, imageUrl, price, _id, createdAt, isGiveAway, giveawayRequests } = ad;

  const maxLength = 60;  // Allow for a longer title
  let trimmedString = title?.substr(0, maxLength);
  trimmedString = trimmedString?.substr(0, Math.min(trimmedString?.length, trimmedString?.lastIndexOf(' ')));

  const date = moment(createdAt).format('ll');

  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleEditBtnClick = () => {
    navigate(`/update/item/${_id}`, { state: ad });
  };

  const handleGiveaway = () => {
    const confirmGiveaway = window.confirm("Are you sure you want to give away this item?");
    if (confirmGiveaway) {
      dispatch(addGiveaway(_id));
    }
  };

  const handleGiveawayRequestList = () => {
    setDialogOpen(true);
  };

  const handleSelectWinner = () => {
    dispatch(selectWinner(_id));
  };

  return (
    <Card className="my-ad-card" style={{ cursor: 'pointer', marginBottom: '2rem', padding: '1.5rem', width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div
        style={{
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #ddd',
          width: '100%',  // Ensure full width
        }}
      >
        <span style={{ fontSize: '14px', color: '#888' }}>
          Posted on <span style={{ fontWeight: 'bold', color: '#333' }}>{date}</span>
        </span>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: '1',
            marginLeft: '2rem',
          }}
        >
          <img
            src={`${imageUrl}`}
            alt="profile"
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <p
            style={{
              marginBottom: '0px',
              fontSize: '18px',
              fontWeight: 'bold',
              marginLeft: '12px',
              width: '70%',
              color: '#333',
            }}
          >
            {title?.length > 60 ? `${trimmedString}...` : title}
          </p>
        </div>

        <div
          style={{
            flex: 1,
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Rs {price}</span>
          
          {isGiveAway ? (
            <span
              style={{
                background: '#FF6347',
                color: '#FFFFFF',
                padding: '6px 1.5rem',
                borderRadius: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              Give Away
            </span>
          ) : (
            <span
              style={{
                background: '#23e5db',
                color: '#002f34',
                padding: '6px 2.5rem',
                borderRadius: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              Active
            </span>
          )}

          <IconButton onClick={handleClick} style={{ marginLeft: '1.5rem' }}>
            <BsThreeDots />
          </IconButton>
        </div>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{
            '.MuiPaper-root': {
              width: '20%',
              padding: '.5rem',
              left: 'auto !important',
              right: '300px',
            },
          }}
        >
          <div>
            <MenuItem onClick={handleEditBtnClick}>Edit now</MenuItem>
          </div>
          {!isGiveAway && (
            <MenuItem onClick={handleGiveaway}>Give Away</MenuItem>
          )}
          <MenuItem onClick={() => dispatch(deleteAd(_id))}>Delete</MenuItem>
          {isGiveAway && (
            <MenuItem onClick={handleGiveawayRequestList}>Giveaway Requests</MenuItem>
          )}
        </Menu>
      </div>

      {/* Dialog to display giveaway requests */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Giveaway Requests</DialogTitle>
        <DialogContent>
          <List>
            {giveawayRequests?.map((request) => (
              <ListItem key={request._id}>
                <ListItemText
                  primary={request.userId?.name || 'Unknown User'}
                  secondary={request.status}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSelectWinner} color="primary">
            Select Winner
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog to display winner details */}
      {selectedWinner && (
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Winner Details</DialogTitle>
          <DialogContent>
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={selectedWinner.userId.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={selectedWinner.userId.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Selected At" secondary={moment(selectedWinner.selectedAt).format('ll')} />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Card>
  );
};

export default MyAd;
