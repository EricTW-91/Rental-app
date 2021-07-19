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
import { Container, Row, Col } from 'react-bootstrap';

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
      <Container fluid>
        <Row>
          <Col xs={12} md={2} className='my-auto'>
            <Link to="/" className="logo">Logo</Link>
          </Col>
          <Col xs={12} md={10}>
            <Row>
              <Col xs={12} md={4} xl={3} className='my-2'>
                <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Location" className="header-input" />
              </Col>
              <Col xs={12} md={8} xl={4} className='my-2'>
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
              </Col>
              <Col xs={6} md={6} xl={3} className='my-2'>
                <input type="text" value={adults1} onChange={e => setAdults1(e.target.value)} placeholder="Number of people" className="header-input" id="number-of-people" />
              </Col>
              <Col xs={6} md={6} xl={2} className='my-2'>
                <Button variant="primary" onClick={onSubmit} className="primary-button">Search</Button>
              </Col>

            </Row>
          </Col>
          {/* <Col xs={12} md={10} xl={10}>
            <FontAwesomeIcon icon={faUserCircle} className="icon-user-circle" />
          </Col> */}
        </Row>
      </Container>

    </div>
  








    // <div className="header">
    //   <div className="header-wrapper">
    //     <div>
    //       <Link to="/" className="logo">
    //         Logo
    //       </Link>
    //     </div>
    //     <div className="header-form">
    //       <div className="input-item">
    //         <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Location" className="header-input" />
    //       </div>
    //       <div className="input-item">
    //         <DateRangePicker 
    //           startDate={startDate}
    //           startDateId="startDateId"
    //           endDate={endDate}
    //           endDateId="endDateId"
    //           onDatesChange={onDatesChange}
    //           focusedInput={calendarFocused}
    //           onFocusChange={(calendarFocused) => setCalenderFocused(calendarFocused)} // Probably we don't need to write argument
    //           showClearDates={true}
    //           numberOfMonths={2}
    //           isOutsideRange={() => false}
    //         />
    //       </div>
    //       <div className="input-item">
    //         <input type="text" value={adults1} onChange={e => setAdults1(e.target.value)} placeholder="Number of people" className="header-input" id="number-of-people" />
    //       </div>
    //       <Button variant="primary" onClick={onSubmit} className="primary-button">Search</Button>
    //     </div>
    //     <div>
    //       <FontAwesomeIcon icon={faUserCircle} className="icon-user-circle" />
    //     </div>
    //   </div>
    // </div>
  )
}

export default Header
