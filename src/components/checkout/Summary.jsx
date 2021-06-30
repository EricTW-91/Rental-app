import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './Summary.scss';


const Summary = (props) => {
    const price = 33
    const nights = 1
    const taxRate = 0.12
    const subtotal = price * nights
    const total = subtotal + (subtotal * taxRate)
    // const dateCount = () => {
    //     // Calculate the days.
    //     return 0;
    // }

    return (
        <Card className='position-sticky'>
            <Card.Img variant='top' src="https://thumbnails.trvl-media.com/Ni_80GlKLJxy4TbYuP8bkhmuHiQ=/250x140/smart/filters:quality(60)/images.trvl-media.com/hotels/34000000/33820000/33813500/33813454/cc10ff5c_z.jpg"></Card.Img>
            <Card.Body>
                <Card.Title>Title</Card.Title>
                <div className='d-flex justify-content-between'>
                    <span>${price} X { nights } night</span>
                    <span>${ subtotal }</span>
                </div>
                <div className='d-flex justify-content-between'>
                    <span>Occupancy taxes and fees</span>
                    <span>${ subtotal * taxRate }</span>
                </div>
                <div className='d-flex justify-content-between'>
                    <span><strong>Total</strong></span>
                    <span>${ total }</span>
                </div>
            </Card.Body>
        </Card>
     );
}
 
export default Summary;