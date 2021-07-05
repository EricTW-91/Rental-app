import React, { useState, useEffect } from 'react'
import usePropertiesContext from '../../context/Properties';
import { useParams } from 'react-router-dom';
import CheckoutBox from './CheckoutBox';
import DetailTop from './DetailTop';
import DetailBody from './DetailBody';
import './Detail.scss';

const Detail = () => {
  const { id } = useParams();
  const { searchResult, setHotelId, detail } = usePropertiesContext();
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    if (searchResult) {
      searchResult.forEach(result => {
        result.id === Number(id) && setSelectedProperty(result)
      })
    }
  }, [searchResult, id]);

  useEffect(() => {
    id && setHotelId(id);
  }, [id]);

  useEffect(() => {
    console.log(selectedProperty);
  },[selectedProperty])
  
  return (
    <>
      {
        selectedProperty && detail && (
          <div className="detail-wrapper">
            <DetailTop selectedProperty={selectedProperty} />
            <div className="detail-information">
              <DetailBody selectedProperty={selectedProperty} detail={detail} />
              <CheckoutBox selectedProperty={selectedProperty} />
            </div>
          </div>
        )
      }
    </>
  )
}

export default Detail;