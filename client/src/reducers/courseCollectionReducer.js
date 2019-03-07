import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  courseCollection: null
}

const courseCollectionReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GET_COURSECOLLECTION_START:
      return {
        ...state,
        loading: true,
        error: false,
        courseCollection: null
      }
    case actionTypes.GET_COURSECOLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        courseCollection: action.payload
      }
    default:
      return state
  }
}

export default courseCollectionReducer;