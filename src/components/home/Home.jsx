import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Randomize from './Radomize';
import './Home.scss';

const Home = () => {
  return (
      <div>
          <img className='homePageImg' src="https://wallpaperaccess.com/full/839066.jpg" alt="" />
          <div className='categories'>
            <Link to='/category/vancouver'>Vancouver</Link>
            <Link to='/category/burnaby'>Burnaby</Link>
            <Link to='/category/surrey'>Surrey</Link>
            <Link to='/category/richmond'>Richmond</Link>
            <Link to='/category/kelowna'>Kelowna</Link>
            <Link to='/category/nanaimo'>Nanaimo</Link>
          </div>

          <div className='randomProperties'>
            <Randomize/>
          </div>
      </div>

  )
}

export default Home
