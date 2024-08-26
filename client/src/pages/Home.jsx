import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Cards from '../components/Cards'
import Categories from '../components/Categories'
import '../styles/home.css'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div>
      <Container>
        <Hero/>
        {/* <Categories /> */}
        <Cards />
      </Container>
    </div>
  )
}

export default Home
