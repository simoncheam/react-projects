// start with boiler

//state - current state before update, action - what we are doing
const reducer = (state, action) => {

    if(action.type ==='CLEAR_CART'){
        return{
            ...state,
            cart: [],
        }
    }
    return state;

}

export default reducer;