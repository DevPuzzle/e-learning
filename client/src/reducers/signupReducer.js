import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  email: null

}

const signupReducer = ( state = initialState, action) => {
  switch(action.type){
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        email: action.payload
      }
      default: 
        return state;
  }
}

export default signupReducer;