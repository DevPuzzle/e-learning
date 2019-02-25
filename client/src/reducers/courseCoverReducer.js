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
        error: false
      }
    case actionTypes.ADD_COURSECOVER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        courseCovers: [...state.courseCovers, action.payload]
      }
    case actionTypes.ADD_COURSECOVER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        courseCovers: null
      }
    case actionTypes.UPDATE_COURSECOVER_START:
      return {
        ...state,
        loading: true,
        error: false
      }
    case actionTypes.UPDATE_COURSECOVER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        courseCovers: state.courseCovers.map(courseCover => courseCover._id === action.payload._id ?
          {...courseCover, courseCover: action.payload} : courseCover)
      }
    case actionTypes.DELETE_COURSECOVER_SUCCESS:
    console.log('cover', state.courseCovers)
      return {
        ...state,
        courseCovers: state.courseCovers.filter(courseCover => courseCover._id !== action.payload)
      }
    default:
      return state
  }
}

export default courseCoverReducer;