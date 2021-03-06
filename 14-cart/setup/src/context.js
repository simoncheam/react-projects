import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  // looks for reducer function and initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  // * remove items from cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // * remove single item from cart
  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };
  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };
  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    const response = await fetch(url);
    const data = await response.json();
    dispatch({
      type: 'DISPLAY_ITEMS',
      payload: data,
    });
  };

  const toggleAmount = (id, type) => {
    dispatch({
      type: 'TOGGLE_AMOUNT',
      payload: { id, type },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
