import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import axios from 'axios';
import SearchReducer from '../reducer/SearchReducer';
import moment from 'moment';

const PropertiesContext = createContext();

const API = {
  BASEURI: "https://hotels4.p.rapidapi.com",
  KEY: process.env.REACT_APP_HOTELS_API_KEY
};

const CHECK_IN_DEFAULT = moment().format('YYYY-MM-DD'); // today
const CHECK_OUT_DEFAULT = moment().add(3, 'days').format('YYYY-MM-DD'); // 3 days later

const DEFAULT_SEARCH_PARAMS = {
  adults1: '1',
  pageNumber: '1',
  destinationId: '169712', // Vancouver
  pageSize: '25',
  checkIn: CHECK_IN_DEFAULT, // Change here to string gotten by Date() Later, we can set date depending on the time user view the site
  checkOut: CHECK_OUT_DEFAULT, // plus 3 days
  sortOrder: 'PRICE',
  locale: 'en_CA',
  currency: 'CAD'
};

const PropertiesProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [searchParams, dispatchSearchParams] = useReducer(SearchReducer, DEFAULT_SEARCH_PARAMS);
  const [cityName, setCityName] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if(cityName) {
        try {
          const locationOptions = {
            method: 'GET',
            url: `${API.BASEURI}/locations/search`,
            params: { query: cityName, locale: 'en_CA' },
            headers: {
              'x-rapidapi-key': API.KEY,
              'x-rapidapi-host': 'hotels4.p.rapidapi.com'
            }
          };
          const location = await axios.request(locationOptions);
          dispatchSearchParams({
            type: 'SET_DESTINATION_ID',
            payload: location.data.suggestions[0].entities[0].destinationId
          });
        } catch(e) {
          console.error(e);
        }
      }
    };
    fetchLocation();
  }, [cityName]);

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (searchParams) {
        try {
          const searchOptions = {
            method: 'GET',
            url: `${API.BASEURI}/properties/list`,
            params: searchParams,
            headers: {
              'x-rapidapi-key': API.KEY,
              'x-rapidapi-host': 'hotels4.p.rapidapi.com'
            }
          };
          const res = await axios.request(searchOptions);
          console.log(res.data.data.body.searchResults.results);
          return res.data.data.body.searchResults.results;
        } catch(e) {
          console.error(e);
        }
      }
    };
    searchParams && setSearchResult(fetchSearchResult());
  }, [searchParams])
  
  return (
    <PropertiesContext.Provider value={{ searchResult, setCityName, dispatchSearchParams }}>
      { children }
    </PropertiesContext.Provider>
  )
}

const usePropertiesContext = () => useContext(PropertiesContext);

export { PropertiesProvider, usePropertiesContext as default }
