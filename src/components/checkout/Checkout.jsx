import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import Summary from './Summary';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import usePropertiesContext from '../../context/Properties';
import './Checkout.scss';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SplitForm from './SplitForm';

const stripePromise = loadStripe("pk_test_51J7SMoEjRcQn4fjuN8srCjZp63y1FnrXPK2jeT0n6YZ1EcLQW8kmifDNCoiTfi7bfgnCq8YpD8ssMXS7cWSXKYML00OLwcdZjB");


const CheckoutStripe = (props) => {
  const { checkout } = usePropertiesContext();
  const [startDate, setCheckIn] = useState(moment(checkout.checkIn));
  const [endDate, setCheckOut] = useState(moment(checkout.checkOut));
  const [adults, setAdults] = useState(checkout.adults);
  const [calendarFocused, setCalenderFocused] = useState(null);
  const [nights, setNights] = useState(0);

  const onDatesChange = ({ startDate, endDate }) => {
    setCheckIn(startDate);
    setCheckOut(endDate);
  }

  const nightsCheck = (start, end) => {
    return (Math.ceil((end._d.getTime()-start._d.getTime()) / (1000*3600*24)))
  }

  useEffect(() => {
    if (startDate && endDate) {
      setNights(nightsCheck(startDate, endDate));
    }
    console.log(startDate, endDate, checkout)
  }, [startDate, endDate])

  return checkout.selectedProperty === null ? (
    <div>
      <Spinner animation='border' />
    </div>
  ):(
      <>
        <Container style={{width: '90%', margin: '50px auto'}}>
          <Row>
            <Col lg={7} className='p-3'>
              <Container>
                <h3>Confirm and pay</h3>
                <hr />
                
                <h5>Your trip</h5>
                <h6>Dates</h6>
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
                <h6>Guests</h6>
                <Form.Control type='number' value={adults} min={1} max={2} onChange={(e)=> setAdults(e.target.value)}></Form.Control>
                <hr/>

                <h5>Pay with</h5>

                <Elements stripe={stripePromise}>
                  <SplitForm />
                </Elements>
                <hr/>

              </Container>
            </Col>

            <Col lg={5} className='position-relative'>
              <Summary
                name={checkout.selectedProperty.name}
                img={checkout.selectedProperty.optimizedThumbUrls.srpDesktop}
                price={checkout.selectedProperty.ratePlan.price.exactCurrent}
                nights={nights}
                adults={adults}
              />
            </Col>
          </Row>
        </Container>
      </>
  )
}

export default CheckoutStripe
