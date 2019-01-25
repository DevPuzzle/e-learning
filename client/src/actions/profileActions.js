import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = 'http://localhost:5000/user';

export const passwordChange = (username) => {
  console.log(username)
  return dispatch => {
    dispatch(changePasswordStart());
    axios.post(`${URL}/edit/password/${username}`)
    .then(response => {
      dispatch(changePasswordSuccess(response.data));
      console.log('data', response.data);
    })
  }
}

export const changePasswordStart = () => {
  return {
    type: actionTypes.PASSWORD_CHANGE_START
  }
}

export const changePasswordSuccess = (data) => {
  return {
    type: actionTypes.PASSWORD_CHANGE_SUCCESS,
    payload: data
  }
}