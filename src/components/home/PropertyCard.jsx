import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const PropertyCard = (props) => {
    return (
        <Card>
            <Card.Title>{ props.data.name}</Card.Title>
        </Card>
     );
}
 
export default PropertyCard;