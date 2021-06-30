import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import axios from 'axios';
import SearchReducer from '../reducer/SearchReducer';
import CacheReducer from '../reducer/CacheReducer';
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
  currency: 'CAD',
};

const DEFAULT_CACHE = {
  vancouver: '169712'
};

const PropertiesProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [searchParams, dispatchSearchParams] = useReducer(SearchReducer, DEFAULT_SEARCH_PARAMS);
  const [cityName, setCityName] = useState(null);
  const [cityNameCache, dispatchCityNameCache] = useReducer(CacheReducer, DEFAULT_CACHE);
  const [gotDestinationId, setGotDestinationId] = useState(true);
  
  const setDestinationId = (cityId) => {
    dispatchSearchParams({
      type: 'SET_DESTINATION_ID',
      cityId
    });
    setGotDestinationId(true);
    setCityName(null); // to get city name when user input the same one as previous one
  };
  
  useEffect(() => {
    const fetchLocation = async () => {
      if(cityName) {
        if(Object.keys(cityNameCache).includes(cityName)) { // if user have searched input city before
          setDestinationId(cityNameCache[cityName]);
        } else {
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
            const cityId = location.data.suggestions[0].entities[0].destinationId;
            dispatchCityNameCache({
              type: 'ADD_CACHE',
              cache: { [cityName]: cityId }
            });
            setDestinationId(cityId);
          } catch(e) {
            console.error(e);
          }
        }
      }
    };
    fetchLocation();
  }, [cityName]);

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (searchParams && gotDestinationId) {
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
          setSearchResult(res.data.data.body.searchResults.results);
          setGotDestinationId(false); // this function can't be executed with getting destination ID.
        } catch(e) {
          console.error(e);
        }
      }
    };
    searchParams && fetchSearchResult();
  }, [searchParams, gotDestinationId])
  
  return (
    <PropertiesContext.Provider
      value={{
        searchResult,
        setCityName,
        dispatchSearchParams,
        searchParams
      }}
    >
      { children }
    </PropertiesContext.Provider>
  )
}

const usePropertiesContext = () => useContext(PropertiesContext);

export { PropertiesProvider, usePropertiesContext as default }
