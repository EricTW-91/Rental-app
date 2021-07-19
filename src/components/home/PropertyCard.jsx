import React, { useState, useEffect } from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './PropertyCard.scss';

const PropertyCard = (props) => {
    return (
        <>
            <Link className='propertyLink' to={`/detail/${props.data.id}`} >
                {/* <div className='showProperty_home'> */}
                <Container>
                    <Row>
                        <Col xl={3} md={4} xl={5} style={{overflow: 'hidden'}}>
                            <Image src={props.data.optimizedThumbUrls.srpDesktop} rounded />
                        </Col>
                        <Col xl={9} md={8} xl={7}>
                            <Row><h3>{props.data.name}</h3></Row>
                            <Row><span className='locality'>{ props.data.address.locality }</span></Row>
                            <Row><span className='starRating'>{ '⭐ ' + props.data.starRating }</span></Row>
                            <Row><span className='price'>${ props.data.ratePlan.price.exactCurrent }</span></Row>
                        </Col>
                    </Row>   
                </Container>
                {/* </div> */}


            </Link>
            <hr />
        </>
     );
}
 
export default PropertyCard;