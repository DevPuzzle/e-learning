import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  subcategories: null
}

const subCategoriesReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GET_SUBCATEGORIES_START:
    console.log('start')
      return {
        ...state,
        loading: true,
        error: false,
        subcategories: null,
      }
    case actionTypes.GET_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        subcategories: action.payload
      }
    default:
      return state
  }
}

export default subCategoriesReducer;