const SearchReducer = (state, action) => {
  switch(action.type) {
    case 'SET_DESTINATION_ID':
      return {
        ...state,
        destinationId: action.payload
      }
    default:
      return state;
  }
}

export default SearchReducer;