import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Randomize from './Randomize';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.scss';

const Home = () => {
  return (
    <Container fluid>
      <Row>
        <img className='homePageImg' src="https://wallpaperaccess.com/full/839066.jpg" alt="" />
      </Row>
      <Row className='mt-3'>
      {/* <div className='categories'> */}
        <Col xl={12} md={4} xl={2}>
          <Link className='categoryLink' to='/category/vancouver'>
            <img src='https://lp-cms-production.imgix.net/2019-06/27860479.jpg?auto=compress&fit=crop&fm=auto&sharp=10&vib=20&w=1200&h=800'/>
            <span>Vancouver</span>
          </Link>
        </Col>
        <Col xl={12} md={4} xl={2}>
          <Link className='categoryLink' to='/category/burnaby'>
            <img src='https://themortgageprofessionals.ca/wp-content/uploads/2017/06/burnaby-1184x666.jpg'/>
            <span>Burnaby</span>
          </Link>
        </Col>
        <Col xl={12} md={4} xl={2}>
          <Link className='categoryLink' to='/category/surrey'>
            <img src='https://anthemproperties.com/app/uploads/2019/05/Georgetown_Aerial_Cropped-1-1024x814.jpg'/>
            <span>Surrey</span>
          </Link>
        </Col>
        <Col xl={12} md={4} xl={2}>
          <Link className='categoryLink' to='/category/richmond'>
            <img src='https://www.cbre.com/-/media/cbre/countryunitedstates/corporate-offices/midwest/akron/richmond-skyline_768x582.png'/>
            <span>Richmond</span>
          </Link>
        </Col>
        <Col xl={12} md={4} xl={2}>
          <Link className='categoryLink' to='/category/kelowna'>
            <img src='https://bestdistricts.com/wp-content/uploads/2019/03/The-Best-Areas-to-Stay-in-Kelowna-BC.jpg'/>
            <span>Kelowna</span>
          </Link>
        </Col>
        <Col xl={12} md={4} xl={2}>
          <Link className='categoryLink' to='/category/nanaimo'>
            <img src='https://nanaimohomes4sale.com/sites/default/files/community-greatview.jpg'/>
            <span>Nanaimo</span>
          </Link>
        </Col>
      </Row>
      {/* </div> */}
      <Row>
      {/* <div className='randoms'> */}
        <Randomize/>
      {/* </div> */}
      </Row>
    </Container>

  )
}

export default Home
