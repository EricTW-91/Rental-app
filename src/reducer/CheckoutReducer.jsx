const CheckoutReducer = (state, action) => {
  switch(action.type) {
    case 'SET_CHECKOUT':
      return action.payload;
    default:
      return state;
  }
};

export default CheckoutReducer;