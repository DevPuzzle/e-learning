import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = 'http://localhost:5000/user';

export const user = () => {
  return dispatch => {
    dispatch(getUserStart());
    axios.get(`${URL}`)
    .then(response => {
      console.log('data', response.data);
    })
  }
}

export const getUserStart = () => {
  return {
    type: actionTypes.USER_GET_START
  }
}