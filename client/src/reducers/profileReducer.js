import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  password: null
}

const profileReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.PASSWORD_CHANGE_START:
      return{
        ...state, 
        loading: true,
        error: false      
      }
    case actionTypes.PASSWORD_CHANGE_SUCCESS:
      return{
        ...state,
        loading: false,
        password: action.payload,
        error:false        
      }
    case actionTypes.PASSWORD_CHANGE_FAIL:
      return{
        ...state,
        loading: false,
        error: true
      }
    default: 
      return state
  }
}

export default profileReducer;