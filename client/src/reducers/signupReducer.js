import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null

}

const signupReducer = ( state = initialState, action) => {
  switch(action.type){
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        error: null,
        loading: true
      }
      default: 
        return state;
  }
}

export default signupReducer;