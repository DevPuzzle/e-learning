import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  loading: false,
  error: false, 
  themes: null
}

const themesReducer = (state = initialState, action) => {
  switch(action.type){
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
      }
    default:
      return state
  }
}

export default themesReducer;