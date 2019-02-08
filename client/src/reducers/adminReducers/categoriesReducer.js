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
    console.log(action.payload.categoryList)
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
    default: 
      return state
  }
}

export default categoriesReducer;