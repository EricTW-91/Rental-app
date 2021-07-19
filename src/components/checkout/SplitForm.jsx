import React, { useMemo, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './SplitForm.scss'

import useResponsiveFontSize from "./useResponsiveFontSize";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const SplitForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(false)
    const [paymentMessage, setPaymentPessage] = useState({Title: '', Message: ''})

    const handleClose = () => {
        setShow(false)
        if (paymentStatus) {
            
            history.push('/');
        }
    };
    const handleShow = () => setShow(true);


    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });
        console.log("[PaymentMethod]", payload);
        
        if (Object.keys(payload)[0] === 'paymentMethod') {
            setPaymentPessage({ Title: 'Success!', Message: 'Paid successful.' })
            setPaymentStatus(true)
        } else {
            setPaymentPessage({ Title: [payload.error.code], Message: [payload.error.message] })
            setPaymentStatus(false);
        }

        handleShow();
    };

    return (
      <>
        <form onSubmit={handleSubmit}>
            <label>
                Card number
                <CardNumberElement className='cardInput'
                options={options}
                onReady={() => {
                    console.log("CardNumberElement [ready]");
                }}
                onChange={event => {
                    console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                    console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                    console.log("CardNumberElement [focus]");
                }}
                />
            </label><br/>
            <label>
                Expiration date
                <CardExpiryElement className='cardInput'
                options={options}
                onReady={() => {
                    console.log("CardNumberElement [ready]");
                }}
                onChange={event => {
                    console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                    console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                    console.log("CardNumberElement [focus]");
                }}
                />
            </label><br/>
            <label>
                CVC
                <CardCvcElement className='cardInput'
                options={options}
                onReady={() => {
                    console.log("CardNumberElement [ready]");
                }}
                onChange={event => {
                    console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                    console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                    console.log("CardNumberElement [focus]");
                }}
                />
            </label><br/>
            <Button className='paymentBt' type="submit" disabled={!stripe}>
                Pay
            </Button>
        </form>
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title>{paymentMessage.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{paymentMessage.Message}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button> */}
            </Modal.Footer>
        </Modal>
    </>
  );
};

export default SplitForm;