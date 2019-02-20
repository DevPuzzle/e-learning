import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  courseCovers: null
}

const courseCoverReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GET_COURSECOVERS_START:
      return {
        ...state,
        loading: true,
        error: false,
        courseCovers: null
      }
    case actionTypes.GET_COURSECOVERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        courseCovers: action.payload
      }
    case actionTypes.ADD_COURSECOVER_START:
      return{
        ...state,
        loading: true,
        error: false,
        courseCovers: null
      }
    case actionTypes.ADD_COURSECOVER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        courseCovers: action.payload
      }
    case actionTypes.ADD_COURSECOVER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        courseCovers: null
      }
    default:
      return state
  }
}

export default courseCoverReducer;