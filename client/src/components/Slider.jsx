import React from 'react';
import { Carousel } from 'react-bootstrap';

const Slider = ({ images }) => {
  return (
    <Carousel className="custom-carousel" indicators={false}>
      {images.map((img, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={img}
            alt={`Slide ${index + 1}`}
            style={{ objectFit: 'contain' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;

