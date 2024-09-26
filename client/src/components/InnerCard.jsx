import React, { useState } from 'react';
import moment from 'moment';
import { Card, Col, Modal, Button, ListGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestGiveaway, swapRequest } from '../redux/ads/adsSlice';

export const InnerCard = ({ ad, userItems }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [fromId, setFromId] = useState("");
  const dispatch = useDispatch();
  const time = moment(ad.createdAt).fromNow();
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  const { errorMessage, isError, isSuccess, isLoading } =
    useSelector((selector) => selector.ads);

  const handleClick = (id) => {
    navigate(`/item/${id}`, { state: ad });
  };

  const handleRequestClick = (event) => {
    event.stopPropagation(); // Prevent click from propagating to the card
    setShow(true);
  };

  const handleEnrollGiveAwayClick = async (event) => {
    event.stopPropagation(); // Prevent click from propagating to the card
    
    try {
      const result = await dispatch(requestGiveaway(ad._id)).unwrap();
      setSuccessMessage(result.successMsg || "Successfully enrolled in giveaway!"); // Display success message
    } catch (error) {
      console.error("Error enrolling giveaway:", error);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setFromId(item._id);
  };

  const handleConfirmSwap = () => {
    setShow(false);
    dispatch(swapRequest({ fromId: fromId, toId: ad._id }));
    setSuccessMessage(true);
  };

  const handleClose = () => {
    setShow(false);
    setSuccessMessage(false);
  };

  return (
    <>
      <Col md={4} key={ad._id} onClick={() => handleClick(ad._id)}>
        <Card style={{ width: '300px', cursor: 'pointer', position: 'relative' }}>
          {ad.isGiveAway && (
            <Badge
              bg="danger"
              style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px', 
                padding: '0.5em 1em', 
                borderRadius: '8px' 
              }}
            >
              Give Away
            </Badge>
          )}
          <Card.Img
            variant="top"
            src={`${ad.imageUrl}`}
            height={300}
            style={{ objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 'normal',
                fontSize: '14px',
              }}
            >
              {ad.title}
              <span style={{ userSelect: 'none' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              </span>
            </Card.Title>
            <Card.Text style={{ fontSize: '25px', fontWeight: 'bold' }}>
              Rs {ad.price}
            </Card.Text>
            {ad.swapStatus === "none" && <Button onClick={handleRequestClick}>Swap Request</Button>}
            
            {ad.isGiveAway && userDetails?._id !== ad.userId && (
              <Button 
                variant="secondary"
                onClick={handleEnrollGiveAwayClick}
                style={{ marginLeft: '10px' }}
              >
                Enroll Give Away
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>

      {/* Modal for item selection */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select an Item to Swap</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {userItems.map((item, index) => (
              <ListGroup.Item
                key={index}
                active={selectedItem === item}
                onClick={() => handleSelectItem(item)}
                style={{ cursor: 'pointer' }}
              >
                {item.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmSwap}
            disabled={!selectedItem}
          >
            Confirm Swap
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success message */}
      <Modal show={successMessage} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Swap request approved successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Success message for giveaway enrollment */}
<Modal show={successMessage} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Success</Modal.Title>
  </Modal.Header>
  <Modal.Body>{successMessage}</Modal.Body>
  <Modal.Footer>
    <Button variant="primary" onClick={handleClose}>
      OK
    </Button>
  </Modal.Footer>
</Modal>
    </>
  );
};
