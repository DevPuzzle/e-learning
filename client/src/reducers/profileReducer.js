import * as actionTypes from '../actions/actionTypes';

const initialState = {
  profile: null,
  loading: false,
  error: false,
}

const profileReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.PROFILE_GET_START:
      return{
        ...state, 
        loading: true,
        error: false      
      }
    case actionTypes.PROFILE_GET_SUCCESS:
      return{
        ...state,
        loading: false,
        profile: action.payload,
        error:false        
      }
    case actionTypes.PROFILE_GET_FAIL:
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