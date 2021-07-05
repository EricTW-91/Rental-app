const DetailReducer = (state, action) => {
  switch(action.type) {
    case 'SET_DETAIL':
      return action.payload;
    default:
      return state;
  }
};

export default DetailReducer;