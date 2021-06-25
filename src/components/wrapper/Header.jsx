import React, { useState } from 'react';
import usePropertiesContext from '../../context/Properties';

const Header = () => {
  const { setCityName } = usePropertiesContext();
  const [city, setCity] = useState('');
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (city.length) {
      setCityName(city);
      setCity('');
    }
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={city} onChange={e => setCity(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default Header
