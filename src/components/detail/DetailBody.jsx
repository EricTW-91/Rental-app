import React from 'react';
import './DetailBody.scss';

const DetailBody = ({ selectedProperty }) => {
  return (
    <div className="detail-body">
      <div className="feature">
        <ul>
          <li>Free Cancellation : { selectedProperty.ratePlan.features.freeCancellation ? "Yes" : "No" }</li>
          <li>Credit Card Required : { selectedProperty.ratePlan.features.noCCRequired ? "Yes" : "No" }</li>
          <li>Payment Preference : { selectedProperty.ratePlan.features.paymentPreference ? "Yes" : "No" }</li>
        </ul>
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
