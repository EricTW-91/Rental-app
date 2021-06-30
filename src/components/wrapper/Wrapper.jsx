import React from 'react'
import Header from './Header';
import Footer from './Footer';
import './Wrapper.scss';

const Wrapper = ({ children }) => {
  return (
    <>
      <Header />
      <section className="main">
        { children }
      </section>
      <Footer />
    </>
  )
}

export default Wrapper
