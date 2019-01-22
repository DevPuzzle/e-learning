import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  token: null,
  loading: false
}


const loginReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOGIN_START:
      return{
        ...state,
        loading: true,
      }
    case actionTypes.LOGIN_SUCCESS:
      return{
        ...state,
        loading: false,
        token: action.payload
      }
    case actionTypes.LOGOUT_SUCCESS:
      return{
        ...state,
        token: null
      }
    default: 
      return state
  }
}

export default loginReducer;