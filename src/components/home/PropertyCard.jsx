import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './PropertyCard.scss';

const PropertyCard = (props) => {
    return (
        <>
            <Link className='propertyLink' to={`/detail/${props.data.id}`} >
                <div className='showProperty_home'>
                    <Image
                        src={props.data.optimizedThumbUrls.srpDesktop}
                        rounded
                    />
                    <h3>{ props.data.name }</h3>
                    <span className='locality'>{ props.data.address.locality }</span>
                    <span>{ '⭐ ' + props.data.starRating }</span>
                    <span>${ props.data.ratePlan.price.exactCurrent }</span>
                </div>


            </Link>
            <hr />
        </>
     );
}
 
export default PropertyCard;