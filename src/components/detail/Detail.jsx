import React, { useState, useEffect } from 'react'
import usePropertiesContext from '../../context/Properties';
import { useParams } from 'react-router-dom';
import CheckoutBox from './CheckoutBox';
import DetailTop from './DetailTop';
import DetailBody from './DetailBody';
import './Detail.scss';

const Detail = () => {
  const { id } = useParams();
  const { searchResult, setHotelId } = usePropertiesContext();
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    if (searchResult) {
      searchResult.forEach(result => {
        result.id === Number(id) && setSelectedProperty(result)
      })
    }
  }, [searchResult, id]);

  useEffect(() => {
    setHotelId(id);
  }, [id]);

  useEffect(() => {
    console.log(selectedProperty);
  },[selectedProperty])
  
  return (
    <div>
      {
        selectedProperty && (
          <div className="detail-wrapper">
            <DetailTop selectedProperty={selectedProperty} />
            <div className="detail-information">
              <DetailBody selectedProperty={selectedProperty} />
              <CheckoutBox selectedProperty={selectedProperty} />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Detail;