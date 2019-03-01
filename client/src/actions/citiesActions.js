import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = 'http://localhost:5000';

export const getCities = (value) => {
  return dispatch => {
    dispatch(getCitiesStart());
    axios.post(`${URL}/search/cities/filter`, {city: value})
    .then(response => {
      dispatch(getCitiesSuccess(response.data.data));
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const getCitiesStart = () => {
  return {
    type: actionTypes.GET_CITIES_START
  }
}

export const getCitiesSuccess = (data) => {
  return {
    type: actionTypes.GET_CITIES_SUCCESS,
    payload: data
  }
}