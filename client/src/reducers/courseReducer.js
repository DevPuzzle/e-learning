import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  course: null
}


const courseReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GET_COURSE_START:
      return {
        ...state,
        loading: true,
        error: false,
        course: null
      }
    case actionTypes.GET_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        course: action.payload
      }
    default:
      return state
  }
}

export default courseReducer;