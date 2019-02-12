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
/*     //SUBCATEGORIES  
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
        themes: null,
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
    //THEMES
    case actionTypes.GET_THEMES_START:
      return {
        ...state,
        loading: true,
        error: false,
        themes: null,
      }
    case actionTypes.GET_THEMES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        themes: action.payload
      }
    case actionTypes.UPDATE_THEME_START:
      return{
        ...state, 
        loading: true,
        error: false
      }
    case actionTypes.UPDATE_THEME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        themes: state.themes.map(theme => theme._id === action.payload._id ?
            {...theme, name: action.payload.name, description: action.payload.description} : theme)
      } */
    default: 
      return state
  }
}

export default categoriesReducer;