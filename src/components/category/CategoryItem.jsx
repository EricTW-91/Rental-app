import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CategoryItem.scss';

const CategoryItem = ({
  name,
  optimizedThumbUrls,
  address,
  starRating,
  ratePlan,
  id
}) => {
  return (
    <div className="property-block">
      <Link to={`/detail/${id}`} className="property-wrapper">
        <Image
          src={optimizedThumbUrls.srpDesktop}
          rounded
        />
        <div className="property-detail">
          <div className="property-name">{name}</div>
          <div className='locality'>{ address.locality }</div>
          <div className="starRating-price">
            <span className='starRating'>{ '⭐ ' + starRating }</span>
            <span className='price'>${ ratePlan.price.exactCurrent }</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CategoryItem
