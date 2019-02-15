import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  token: null,
  username: null,
  error: false,
  role: null
}


const loginReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOGIN_START:
      return{
        ...state,
        loading: true,
        error: false
      }
    case actionTypes.LOGIN_SUCCESS:
      return{
        ...state,
        loading: false,
        token: action.payload.token,
        username: action.payload.username,
        role: action.payload.role,
        error: false
      }
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        token: null,
        username: null
      }
    case actionTypes.LOGOUT_SUCCESS:
      return{
        ...state,
        token: null,
        username: null
      }
    default: 
      return state
  }
}

export default loginReducer;