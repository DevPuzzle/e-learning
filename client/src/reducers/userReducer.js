import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  loading: false,
  error: false,
}

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.USER_GET_START:
      return{
        ...state, 
        loading: true,
        error: false      
      }
    case actionTypes.USER_GET_SUCCESS:
      return{
        ...state,
        loading: false,
        error:false        
      }
    case actionTypes.USER_GET_FAIL:
      return{
        ...state,
        loading: false,
        error: true
      }
    default: 
      return state
  }
}

export default userReducer;