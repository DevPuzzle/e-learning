import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  password: null,
  userData: null,
  avatar: null
}

const profileReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.PASSWORD_CHANGE_START:
      return{
        ...state, 
        loading: true,
        error: false,
        password: null      
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
    case actionTypes.GET_USERDATA_START:
    return{
      ...state,
      loading: true,
      error: false
    }
    case actionTypes.GET_USERDATA_SUCCESS:
    return{
      ...state,
      loading: false,
      error: false,
      userData: action.payload
    }
    case actionTypes.USERDATA_CHANGE_START:
    return{
      ...state,
      loading: true,
      error: false,
      userData: null
    }
    case actionTypes.USERDATA_CHANGE_SUCCESS:
      return{
        ...state,
        loading: false,
        error: false,
        userData: action.payload
      }
      case actionTypes.USERDATA_CHANGE_FAIL:
      return{
        ...state,
        loading: false,
        error: true,
        userData: null
      }
      case actionTypes.AVATAR_UPLOAD_START: 
      return {
        ...state,
        loading: true,
        error: true,
        avatar: null
      }
      case actionTypes.AVATAR_UPLOAD_SUCCESS:
       return {
         ...state,
         loading: false,
         error: false,
         avatar: action.payload
       }
    default: 
      return state
  }
}

export default profileReducer;