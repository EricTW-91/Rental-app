import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import Button from 'react-bootstrap/Button';
import usePropertiesContext from '../../context/Properties';
import './CheckoutBox.scss';

const CheckoutBox = ({ selectedProperty }) => {
  const { searchParams, dispatchCheckout } = usePropertiesContext();
  const [startDate, setCheckIn] = useState(moment(searchParams.checkIn));
  const [endDate, setCheckOut] = useState(moment(searchParams.checkOut));
  const [calendarFocused, setCalenderFocused] = useState(null);
  const [adults, setAdults] = useState(searchParams.adults1);
  const [error, setError] = useState(null);
  const history = useHistory();

  const onDatesChange = ({ startDate, endDate }) => {
    setCheckIn(startDate);
    setCheckOut(endDate);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate && adults && selectedProperty) {
      dispatchCheckout({
        type: "SET_CHECKOUT",
        payload: {
          selectedProperty,
          checkIn: moment(startDate.valueOf()).format('YYYY-MM-DD'),
          checkOut: moment(endDate.valueOf()).format('YYYY-MM-DD'),
          adults
        }
      })
      history.push('/checkout');
    } else {
      setError('Input all information');
    }
  };
  
  return (
    <div className="checkout-box-wrapper">
      <div className="checkout-box">
        <div className="checkout-header">
          <span className='price'><b>$ { selectedProperty.ratePlan.price.exactCurrent }</b> / per night</span>
          <span className='starRating'>{ '⭐ ' + selectedProperty.starRating }</span>
        </div>
        <div className="input-item">
          <DateRangePicker 
            startDate={startDate}
            startDateId="startDateId"
            endDate={endDate}
            endDateId="endDateId"
            onDatesChange={onDatesChange}
            focusedInput={calendarFocused}
            onFocusChange={(calendarFocused) => setCalenderFocused(calendarFocused)} // Probably we don't need to write argument
            showClearDates={true}
            numberOfMonths={2}
            isOutsideRange={() => false}
          />
        </div>
        <div className="input-item">
          <input type="text" value={adults} onChange={e => setAdults(e.target.value)} placeholder="Number of people" className="header-input" id="number-of-people" />
        </div>
        {
          error && (
            <div>
              <span>{error}</span>
            </div>
          )
        }
        <Button variant="danger" onClick={onSubmit} className="primary-button">Checkout</Button>
      </div>  
    </div>
  )
}

export default CheckoutBox
