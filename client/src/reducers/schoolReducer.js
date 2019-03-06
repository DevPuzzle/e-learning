import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  school: null
}


const schoolReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GET_SCHOOL_START:
      return {
        ...state,
        loading: true,
        error: false,
        school: null
      }
    case actionTypes.GET_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        school: action.payload
      }
    default:
      return state
  }
}

export default schoolReducer;