// start with boiler

//state - current state before update, action - what we are doing
const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload), // items that do not match payload id
    };
  }



  return state;
};

export default reducer;
