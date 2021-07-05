import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import usePropertiesContext from '../../context/Properties';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import Button from 'react-bootstrap/Button';

const CHECK_IN_DEFAULT = moment();
const CHECK_OUT_DEFAULT = moment().add(3, 'days');

const Detail = () => {
  const { id } = useParams();
  const { searchResult, searchParams, dispatchCheckout } = usePropertiesContext();
  const [filteredSearchResult, setFilteredSearchResult] = useState(null);
  const [startDate, setCheckIn] = useState(moment(searchParams.checkIn));
  const [endDate, setCheckOut] = useState(moment(searchParams.checkOut));
  const [calendarFocused, setCalenderFocused] = useState(null);
  const [adults, setAdults] = useState(searchParams.adults1);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (searchResult) {
      searchResult.forEach(result => {
        result.id === Number(id) && setFilteredSearchResult(result)
      })
    }
  }, [searchResult]);

  useEffect(() => {
    console.log(filteredSearchResult);
  },[filteredSearchResult])

  const onDatesChange = ({ startDate, endDate }) => {
    setCheckIn(startDate);
    setCheckOut(endDate);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate && adults && filteredSearchResult) {
      dispatchCheckout({
        type: "SET_CHECKOUT",
        payload: {
          selectedProperty: filteredSearchResult,
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
    <div>
      {
        filteredSearchResult && (
          <div className="checkout-information">
            <div>
              <span className='price'>${ filteredSearchResult.ratePlan.price.exactCurrent }</span>
              <span className='starRating'>{ '⭐ ' + filteredSearchResult.starRating }</span>
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
        )
      }
    </div>
  )
}

export default Detail;