import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './Summary.scss';


const Summary = (props) => {
    const price = props.price
    const nights = props.nights
    const taxRate = 0.12
    const subtotal = price * nights
    const total = subtotal + (subtotal * taxRate)

    return (
        <Card className='position-sticky'>
            <Card.Img variant='top' src="https://thumbnails.trvl-media.com/Ni_80GlKLJxy4TbYuP8bkhmuHiQ=/250x140/smart/filters:quality(60)/images.trvl-media.com/hotels/34000000/33820000/33813500/33813454/cc10ff5c_z.jpg"></Card.Img>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <div className='d-flex justify-content-between mt-3'>
                    <small>${price} X { nights } nights</small>
                    <small>${ subtotal.toFixed(2) }</small>
                </div>
                <div className='d-flex justify-content-between mt-3'>
                    <small>Occupancy taxes and fees</small>
                    <small>${ (subtotal * taxRate).toFixed(2) }</small>
                </div>
                <div className='d-flex justify-content-between mt-3'>
                    <small><strong>Total</strong></small>
                    <small>${ total.toFixed(2) }</small>
                </div>
            </Card.Body>
        </Card>
     );
}
 
export default Summary;