import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  categories: null,
  subcategories: null,
  themes: null
}

const categoriesReducer = ( state = initialState, action ) => {
  switch(action.type){
    //CATEGORIES
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
        categories: action.payload.categoryList
      }
    case actionTypes.UPDATE_CATEGORY_START:
      return {
        ...state,
        loading: true,
        error: false
      }
    case actionTypes.UPDATE_CATEGORY_SUCCESS:    
      return {
        ...state,
        loading: false,
        error: false,
        categories: state.categories.map(category => category._id === action.payload._id ?
          {...category, name: action.payload.name, description: action.payload.description} : category)
      }
    case actionTypes.ADD_CATEGORY_START:
      return {
        ...state,
        loading: true,
        error: false
      }
    case actionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        categories: [...state.categories, action.payload]
      }
      //delete category 
    default: 
      return state
  }
}

export default categoriesReducer;