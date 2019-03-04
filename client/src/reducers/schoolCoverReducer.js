import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  schoolCovers: null
}

const schoolCoversReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GET_SCHOOLCOVERS_START:
      return {
        ...state,
        loading: true,
        error: false,
        schoolCovers: null
      }
    case actionTypes.GET_SCHOOLCOVERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        schoolCovers: action.payload
      }
    case actionTypes.ADD_SCHOOLCOVER_START:
      return {
        ...state,
        loading: true,
        error: false
      }
    case actionTypes.ADD_SCHOOLCOVER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        schoolCovers: [...state.schoolCovers, action.payload.school]
      }
    case actionTypes.DELETE_SCHOOLCOVER_SUCCESS:
      return {
        ...state,
        schoolCovers: state.schoolCovers.filter(schoolCover => schoolCover._id !== action.payload)
      }
    default:
      return state
  }
}

export default schoolCoversReducer;