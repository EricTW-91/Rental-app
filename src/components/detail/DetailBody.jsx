import React from 'react';
import './DetailBody.scss';
import Amenity from './Amenity';

const DetailBody = ({ selectedProperty, detail }) => {
  return (
    <div className="detail-body">
      <div className="feature">
        <ul>
          <li>Free Cancellation : { selectedProperty.ratePlan.features.freeCancellation ? "Yes" : "No" }</li>
          <li>Credit Card Required : { selectedProperty.ratePlan.features.noCCRequired ? "Yes" : "No" }</li>
          <li>Payment Preference : { selectedProperty.ratePlan.features.paymentPreference ? "Yes" : "No" }</li>
        </ul>
        <hr className="border-line" />
      </div>
      <div className="amenities">
        {
          detail.data.body.amenities[1].listItems.map(amenityList => (
            <Amenity key={amenityList.heading} amenityList={amenityList} />
          ))
        }
      </div>
      <div className="guest-reviews">
        <div>
          <span className='starRating'>{ '⭐ ' + selectedProperty.starRating }</span>
        </div>

      </div>
    </div>
  )
}

export default DetailBody
