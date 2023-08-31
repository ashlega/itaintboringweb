import React, { createContext,  useReducer } from 'react';

/*
const initalState = {
    status: "loading"
}
 
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ready':
            return {...state, status: "ready"}
        case 'loading':
            return {...state, status: "loading"}
    
        default:
            return state
    }
}

export { reducer };
*/
const AppContext = createContext();//{state : state, dispatch : dispatch}
export default AppContext;