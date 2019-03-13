import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  schoolCollection: null
}

const schoolCollectionReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GET_SCHOOLCOLLECTION_START:
      return {
        ...state,
        loading: true,
        error: false,
        schoolCollection: null
      }
    case actionTypes.GET_SCHOOLCOLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        schoolCollection: action.payload
      }
    case actionTypes.DELETE_SCHOOLCOLLECTION_START:
      return {
        ...state,
        loading: true,
        error: false
      }
    case actionTypes.DELETE_SCHOOLCOLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        schoolCollection: state.schoolCollection.filter(schoolCollectionEl => schoolCollectionEl._id !== action.payload)
      }
    default:
      return state
  }
}

export default schoolCollectionReducer;