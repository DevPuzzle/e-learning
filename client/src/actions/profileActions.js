import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = 'http://localhost:5000/user';

export const profile = (username) => {
  console.log(username)
  return dispatch => {
    dispatch(getProfileStart());
    axios.get(`${URL}/${username}`)
    .then(response => {
      dispatch(getProfileSuccess(response.data));
      console.log('data', response.data);
    })
  }
}

export const getProfileStart = () => {
  return {
    type: actionTypes.PROFILE_GET_START
  }
}

export const getProfileSuccess = (data) => {
  return {
    type: actionTypes.PROFILE_GET_SUCCESS,
    payload: data
  }
}