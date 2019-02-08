import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  loading: false,
  token: null,
  username: null  
}


const loginAdminReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOGIN_ADMIN_START:
      return{
        ...state,
        loading: true,
      }
    case actionTypes.LOGIN_ADMIN_SUCCESS:
      return{
        ...state,
        loading: false,
        token: action.payload.token,
        username: action.payload.username
      }
    default: 
      return state
  }
}

export default loginAdminReducer;