import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import ItemDetails from '../components/ItemDetails'
import ItemSidebar from '../components/ItemSidebar'
import ItemSlideShow from '../components/ItemSlideShow'
import Slider from '../components/Slider'
import '../styles/item.css'
import Chat from '../components/Chat'

const Item = () => {
  const { state: ad } = useLocation()
console.log("test-ad",ad)
  return (
    <div className="item_container">
      <Container>
        <Row style={{ margin: '3rem 0rem' }}>
          <Col md={8}>
            <Slider images={[ad.imageUrl]} />
            <ItemDetails ad={ad} />
            {/* <ItemSlideShow /> */}
          </Col>
          <Col md={4}>
            <ItemSidebar ad={ad} />
            <Chat ad={ad}/>
          </Col>
          <Col>
          
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Item
