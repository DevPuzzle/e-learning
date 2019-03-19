import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  imageError: false,
  passwordError: false,
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
        password: null,
        imageError: false,
        passwordError: false,      
      }
    case actionTypes.PASSWORD_CHANGE_SUCCESS:
      return{
        ...state,
        loading: false,
        password: action.payload,
        password: null,
        imageError: false,
        passwordError: false,        
      }
    case actionTypes.PASSWORD_CHANGE_FAIL:
      return{
        ...state,
        loading: false,
        error: false,
        imageError: false,
        passwordError: true,
      }
    case actionTypes.GET_USERDATA_START:
    return{
      ...state,
      loading: true,
      password: null,
      error: false,
      imageError: false,
      passwordError: false
    }
    case actionTypes.GET_USERDATA_SUCCESS:
    return{
      ...state,
      loading: false,
      error: false,
      imageError: false,
      passwordError: false,
      userData: action.payload
    }
    case actionTypes.USERDATA_CHANGE_START:
    return{
      ...state,
      loading: true,
      error: false,
      imageError: false,
      passwordError: false
    }
    case actionTypes.USERDATA_CHANGE_SUCCESS:
      return{
        ...state,
        loading: false,
        error: false,
        imageError: false,
        passwordError: false,
        userData: action.payload
      }
      case actionTypes.USERDATA_CHANGE_FAIL:
      return{
        ...state,
        loading: false,
        error: true,
        imageError: false,
        passwordError: false,
      }
      case actionTypes.AVATAR_UPLOAD_START: 
      return {
        ...state,
        loading: true,
        error: false,
        imageError: false,
        passwordError: false,
        avatar: null
      }
      case actionTypes.AVATAR_UPLOAD_SUCCESS:  
      return {
         ...state,
         loading: false,
         error: false,
        imageError: false,
        passwordError: false,
         avatar: action.payload
       }
      case actionTypes.AVATAR_UPLOAD_FAIL:
       return {
         ...state,
         loading: false,
         error: false,
        imageError: true,
        passwordError: false,
       }
    default: 
      return state
  }
}

export default profileReducer;