import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  loading: false,
  token: null,
  
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
        token: action.payload
      }
    default: 
      return state
  }
}

export default loginAdminReducer;