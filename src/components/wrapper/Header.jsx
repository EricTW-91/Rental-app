import React, { useState, useEffect } from 'react';
import usePropertiesContext from '../../context/Properties';
import Button from 'react-bootstrap/Button';
import './Header.scss';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const Header = () => {
  const { setCityName } = usePropertiesContext();
  const [city, setCity] = useState('');
  const [person, setPerson] = useState('');
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(3, 'days'));
  const [calendarFocused, setCalenderFocused] = useState(null);

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  useEffect(() => {
    console.log(`startDate: ${moment(startDate.valueOf()).format('YYYY-MM-DD')}`);
    console.log(`endDate: ${endDate}`);
  }, [startDate, endDate])
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (city.length) {
      setCityName(city);
      setCity('');
    }
  }
  
  return (
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
        <input type="text" value={person} onChange={e => setPerson(e.target.value)} placeholder="Number of people" className="header-input" id="number-of-people" />
      </div>
      <Button variant="primary" onClick={onSubmit} className="primary-button">Search</Button>
    </div>
  )
}

export default Header
