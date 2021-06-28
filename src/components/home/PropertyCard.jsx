import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PropertyCard = (props) => {
    return (
        <Link to={`/detail/${props.data.id}`}>
            <img
                src={props.data.optimizedThumbUrls.srpDesktop}
                style={{width: '30vw'}}
            />

        </Link>
     );
}
 
export default PropertyCard;