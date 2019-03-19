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
        error: false,
        loading: true,
        email: null
      }
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        email: action.payload
      }
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
        email: null
      }
      default: 
        return state;
  }
}

export default signupReducer;