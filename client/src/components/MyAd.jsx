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

  const maxLength = 30;
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

  const handleRequestEdit = (requestId) => {
    // Implement the edit functionality here
    console.log(`Editing request with ID: ${requestId}`);
  };

  const handleRequestDelete = (requestId) => {
    // Implement the delete functionality here
    console.log(`Deleting request with ID: ${requestId}`);
  };

  const handleSelectWinner = () => {
    dispatch(selectWinner(_id));
  };

  return (
    <Card style={{ cursor: 'pointer' }}>
      <div
        style={{
          padding: '2rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '14px' }}>
          From <span style={{ fontWeight: 'bold' }}>{date}</span>
        </span>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: '1',
            marginLeft: '3.5rem',
          }}
        >
          <img
            src={`${imageUrl}`}
            alt="profile"
            width={50}
            height={50}
          />
          <p
            style={{
              marginBottom: '0px',
              fontSize: '16px',
              fontWeight: 'bold',
              marginLeft: '8px',
            }}
          >
            {title?.length > 30 ? `${trimmedString}...` : title}
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
          <span style={{ fontSize: '14px' }}>Rs {price}</span>
          
          {isGiveAway ? (
            <span
              style={{
                background: '#FF6347',
                color: '#FFFFFF',
                padding: '4px 1rem',
                borderRadius: '1rem',
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
                padding: '4px 2rem',
                borderRadius: '1rem',
              }}
            >
              Active
            </span>
          )}

          <span style={{ fontSize: '14px' }}>This ad is currently live</span>

          <IconButton onClick={handleClick}>
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
