import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  message: false,
  error: false
}

const forgotPasswordReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FORGOT_START:
      return{
        ...state,
        loading: true,
        message: false,
        error: false
      }
    case actionTypes.FORGOT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: true,
        error: false
      }
    case actionTypes.FORGOT_FAIL:
      return {
        ...state,
        loading: false,
        message: false,
        error: true
      }
    case actionTypes.RESET_FORGOT:
      return {
        ...state,
        loading: false,
        message: false,
        error: false
      }
    default:
      return state
  }
}

export default forgotPasswordReducer;