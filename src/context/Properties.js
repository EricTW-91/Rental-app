import React, { createContext, useContext, useEffect, useState } from 'react'

const PropertiesContext = createContext();

const SAMPLE_PROPERTIES = [{
  // Will write sample information here
}]

const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState(SAMPLE_PROPERTIES);

  useEffect(() => {
    // Will fetch information from API
  }, [])
  
  return (
    <PropertiesContext.Provider value={{ properties }}>
      { children }
    </PropertiesContext.Provider>
  )
}

const usePropertiesContext = () => useContext(PropertiesContext);

export { PropertiesProvider, usePropertiesContext as default }
