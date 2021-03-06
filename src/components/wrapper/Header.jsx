import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import usePropertiesContext from '../../context/Properties';
import Button from 'react-bootstrap/Button';
import './Header.scss';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const CHECK_IN_DEFAULT = moment();
const CHECK_OUT_DEFAULT = moment().add(3, 'days');

const Header = () => {
  const { cityName, dispatchSearchParams, searchParams } = usePropertiesContext();
  const [city, setCity] = useState('');
  const [adults1, setAdults1] = useState('');
  const [startDate, setCheckIn] = useState(CHECK_IN_DEFAULT);
  const [endDate, setCheckOut] = useState(CHECK_OUT_DEFAULT);
  const [calendarFocused, setCalenderFocused] = useState(null);
  const history = useHistory();
  // const [error, setError] = 

  useEffect(() => {
    cityName && setCity(cityName);
  }, [cityName]);

  const onDatesChange = ({ startDate, endDate }) => {
    setCheckIn(startDate);
    setCheckOut(endDate);
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (city.length) {
      dispatchSearchParams({
        type: 'UPDATE_SEARCH_PARAMS',
        uploads: {
          adults1,
          checkIn: moment(startDate.valueOf()).format('YYYY-MM-DD'),
          checkOut: moment(endDate.valueOf()).format('YYYY-MM-DD'),
        },
        oldDestinationId: searchParams.destinationId
      })
      // setCityName(city.toLowerCase());
      history.push(`/category/${city.toLowerCase()}`);
      // setCity('');
      // setCheckIn(CHECK_IN_DEFAULT);
      // setCheckOut(CHECK_OUT_DEFAULT);
      // setAdults1('');
      
    }
  }
  
  return (
    <div className="header">
      <div className="header-wrapper">
        <div>
          <Link to="/" className="logo">
            Logo
          </Link>
        </div>
        <div className="header-form">
          <div className="input-item">
            <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Location" className="header-input" />
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
            <input type="text" value={adults1} onChange={e => setAdults1(e.target.value)} placeholder="Number of people" className="header-input" id="number-of-people" />
          </div>
          <Button variant="primary" onClick={onSubmit} className="primary-button">Search</Button>
        </div>
        <div>
          <FontAwesomeIcon icon={faUserCircle} className="icon-user-circle" />
        </div>
      </div>
    </div>
  )
}

export default Header
