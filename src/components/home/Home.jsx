import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Randomize from './Randomize';
import './Home.scss';

const Home = () => {
  return (
      <div>
          <img className='homePageImg' src="https://wallpaperaccess.com/full/839066.jpg" alt="" />
          <div className='categories'>
        <Link className='categoryLink' to='/category/vancouver'>
          <img src='https://lp-cms-production.imgix.net/2019-06/27860479.jpg?auto=compress&fit=crop&fm=auto&sharp=10&vib=20&w=1200&h=800'/>
          <span>Vancouver</span>
            </Link>
        <Link className='categoryLink' to='/category/burnaby'>
          <img src='https://themortgageprofessionals.ca/wp-content/uploads/2017/06/burnaby-1184x666.jpg'/>
          <span>Burnaby</span>
        </Link>
        <Link className='categoryLink' to='/category/surrey'>
          <img src='https://anthemproperties.com/app/uploads/2019/05/Georgetown_Aerial_Cropped-1-1024x814.jpg'/>
          <span>Surrey</span>
            </Link>
            <Link className='categoryLink' to='/category/richmond'>
              <img src='https://www.cbre.com/-/media/cbre/countryunitedstates/corporate-offices/midwest/akron/richmond-skyline_768x582.png'/>
              <span>Richmond</span>
            </Link>
        <Link className='categoryLink' to='/category/kelowna'>
          <img src='https://bestdistricts.com/wp-content/uploads/2019/03/The-Best-Areas-to-Stay-in-Kelowna-BC.jpg'/>
          <span>Kelowna</span>
            </Link>
        <Link className='categoryLink' to='/category/nanaimo'>
          <img src='https://nanaimohomes4sale.com/sites/default/files/community-greatview.jpg'/>
          <span>Nanaimo</span>
            </Link>
          </div>

          <div className='randoms'>
            <Randomize/>
          </div>
      </div>

  )
}

export default Home
