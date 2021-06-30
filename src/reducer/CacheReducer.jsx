const CacheReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_CACHE':
      return {
        ...state,
        ...action.cache
      }
    default:
      return state;
  }
}

export default CacheReducer;