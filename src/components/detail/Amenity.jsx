import React from 'react'
import AmenityItem from './AmenityItem';
import './Amenity.scss';

const Amenity = ({ amenityList }) => {
  return (
    <div className="amenity-paragraph">
      <div className="amenity-heading">{amenityList.heading}</div>
      {
        amenityList.listItems.map(amenity => (
          <AmenityItem key={amenity} amenity={amenity} />
        ))
      }
    </div>
  )
}

export default Amenity
