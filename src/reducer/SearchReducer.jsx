const SearchReducer = (state, action) => {
  switch(action.type) {
    case 'SET_DESTINATION_ID':
      return {
        ...state,
        destinationId: action.cityId,
      }
    case 'UPDATE_SEARCH_PARAMS':
      return {
        ...state,
        ...action.uploads,
      }
    default:
      return state;
  }
}

export default SearchReducer;