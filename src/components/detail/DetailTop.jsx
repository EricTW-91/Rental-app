import React from 'react'
import { Image } from 'react-bootstrap';
import './DetailTop.scss';

const DetailTop = ({ selectedProperty }) => (
  <div className="top-information">
    <div className="top-wrapper">
      <div className="top-sentence">
        <h3>{ selectedProperty.name }</h3>
        <div>
          <span>{ selectedProperty.address.locality }, </span>
          <span>{ selectedProperty.address.region }, </span>
          <span>{ selectedProperty.address.countryName }</span>
        </div>
      </div>
      <Image 
        src={ selectedProperty.optimizedThumbUrls.srpDesktop }
        rounded
      />
    </div>
    <hr/>
  </div>
)

export default DetailTop
