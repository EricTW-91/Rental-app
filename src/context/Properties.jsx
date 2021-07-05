import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import axios from 'axios';
import SearchReducer from '../reducer/SearchReducer';
import CacheReducer from '../reducer/CacheReducer';
import moment from 'moment';
import CheckoutReducer from '../reducer/CheckoutReducer';
import DetailReducer from '../reducer/DetailReducer';

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

const DEFAULT_CHECKOUT = {
  selectedProperty: null,
  checkIn: CHECK_IN_DEFAULT,
  checkOut: CHECK_OUT_DEFAULT,
  adults: '1'
};

const PropertiesProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [searchParams, dispatchSearchParams] = useReducer(SearchReducer, DEFAULT_SEARCH_PARAMS);
  const [cityName, setCityName] = useState(null);
  const [cityNameCache, dispatchCityNameCache] = useReducer(CacheReducer, DEFAULT_CACHE);
  const [gotDestinationId, setGotDestinationId] = useState(true);
  const [checkout, dispatchCheckout] = useReducer(CheckoutReducer, DEFAULT_CHECKOUT);
  const [hotelId, setHotelId] = useState(null);
  const [detail, dispatchDetail] = useReducer(DetailReducer, null);

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

  useEffect(() => {
    const fetchDetailInfo = async () => {
      if (hotelId) {
        try {
          const detailOptions = {
            method: 'GET',
            url: `${API.BASEURI}/properties/get-details`,
            params: {
              id: hotelId,
              checkIn: searchParams.checkIn,
              checkOut: searchParams.checkOut,
              currency: searchParams.currency,
              locale: searchParams.locale,
              adults1: searchParams.adults1
            },
            headers: {
              'x-rapidapi-key': API.KEY,
              'x-rapidapi-host': 'hotels4.p.rapidapi.com'
            }
          };
          const res = await axios.request(detailOptions);
          dispatchDetail({
            type: "SET_DETAIL",
            payload: res.data
          });
          console.log(res.data);
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchDetailInfo();
  }, [hotelId]);
  
  return (
    <PropertiesContext.Provider
      value={{
        searchResult,
        cityName,
        setCityName,
        dispatchSearchParams,
        searchParams,
        checkout,
        dispatchCheckout,
        setHotelId,
        detail
      }}
    >
      { children }
    </PropertiesContext.Provider>
  )
}

const usePropertiesContext = () => useContext(PropertiesContext);

export { PropertiesProvider, usePropertiesContext as default }
