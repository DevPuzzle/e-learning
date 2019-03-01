import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  cities: null
}

const citiesReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GET_CITIES_START:
      return {
        loading: true,
        error: false,
        cities: null
      }
    case actionTypes.GET_CITIES_SUCCESS:
      return {
        loading: false,
        error: false,
        cities: action.payload
      }
    default:
      return state;
  }
}

export default citiesReducer;