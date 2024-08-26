import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <div className="footer_container">
      <Container>
        <Row>
          <Col md={6} xs={12}>
            <div className="footer_logo_container">
              <h4 className="footer_logo">swapNplay</h4>
              <p className="footer_description">
                Explore all toys in the world with connecting people from diffrent locations
              </p>
            </div>
          </Col>
          <Col md={3} xs={4}>
            <h5 className="about_us_heading">Links</h5>
            <ul className="navlinks">
              <li className="navlink">
                <a href="#/">Home</a>
              </li>
              <li className="navlink">
                <a href="#/">About</a>
              </li>
            </ul>
          </Col>
          
        </Row>
      </Container>
    </div>
  )
}

export default Footer
