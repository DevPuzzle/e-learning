import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = 'http://localhost:5000/user/verifyEmail';

export const verifyEmail = (verify_code) => {
  return dispatch => {
    dispatch(verifyEmailStart());
    axios.post(`${URL}`, {verify_code})
    .then(response => {
      dispatch(verifyEmailSuccess(response.data));
    })
    .catch(err => {
      dispatch(verifyEmailFail(err));
    })
  }
}

export const verifyEmailStart = () => {
  return {
    type: actionTypes.VERIFY_EMAIL_START
  }
}

export const verifyEmailSuccess = (data) => {
  return {
    type: actionTypes.VERIFY_EMAIL_SUCCESS,
    payload: data
  }
}

export const verifyEmailFail = (err) => {
  return {
    type: actionTypes.VERIFY_EMAIL_FAIL,
    payload: err
  }
}