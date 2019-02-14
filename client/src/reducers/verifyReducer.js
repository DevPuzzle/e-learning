import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  message: null

}

const verifyReducer = ( state = initialState, action) => {
  switch(action.type){
    case actionTypes.VERIFY_EMAIL_START:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        message: action.payload
      }
    case actionTypes.VERIFY_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      default: 
        return state;
  }
}

export default verifyReducer;