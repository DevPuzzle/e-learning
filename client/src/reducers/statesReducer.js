import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
  states: null
}

const statesReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GET_STATES_START:
      return {

      }
    default:
      return state;
  }
}

export default statesReducer;