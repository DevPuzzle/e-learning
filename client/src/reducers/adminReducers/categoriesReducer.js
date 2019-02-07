import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  categories: null
}

const categoriesReducer = ( state = initialState, action ) => {
  switch(action.type){
    case actionTypes.GET_CATEGORIES_START:
      return {
        ...state,
        loading: true,
        error: false,
        categories: null
      }
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        categories: action.payload
      }
    default: 
      return state
  }
}

export default categoriesReducer;