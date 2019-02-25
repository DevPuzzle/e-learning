import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  courseList: null
}

const courseListReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GET_COURSELIST_START:
      return{
        ...state,
        loading: true,
        error: false,
        courseList: null
      }
    case actionTypes.GET_COURSELIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        courseList: action.payload
      }
    case actionTypes.GET_COURSELIST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        courseList: null
      }
    default:
      return state
  }
}

export default courseListReducer;