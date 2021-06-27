import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const PropertyCard = (props) => {
    return (
        <img
            src={props.data.optimizedThumbUrls.srpDesktop}
            style={{width: '30vw'}}
        />
     );
}
 
export default PropertyCard;