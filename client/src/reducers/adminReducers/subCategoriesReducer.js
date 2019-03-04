import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  subcategories: null
}

const subCategoriesReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GET_SUBCATEGORIES_START:
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
    case actionTypes.UPDATE_SUBCATEGORY_START:
      return {
        ...state,
        loading: true,
        error: false
      }
    case actionTypes.UPDATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        subcategories: state.subcategories.map(subcategory => subcategory._id === action.payload._id ?
          {...subcategory, name: action.payload.name, description: action.payload.description} : subcategory)
      }
    case actionTypes.ADD_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        subcategories: [...state.subcategories, action.payload]
      }
    case actionTypes.DELETE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        subcategories: state.subcategories.filter(subcategory => subcategory._id !== action.payload)
      }    
    default:
      return state
  }
}

export default subCategoriesReducer;