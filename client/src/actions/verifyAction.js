import * as actionTypes from './actionTypes';
import axios from 'axios';

const verifyURL = 'http://localhost:5000/user/verify';


export const verify = (values) => {
  return dispatch => {
    dispatch(signupStart());
    axios.post(`${URL}`, values)
    .then(response => {
      dispatch(signUpSuccess(response.data));
      window.location.replace(`http://localhost:3000/home/login`);
    })
    .catch(err =>{
      console.log(err)
    })
  }
}

export const verifyStart = () => {
  return {
    type: actionTypes.VERIFY_START
  }
}

export const  verifySuccess = (data) => {
  return {
    type: actionTypes.VERIFY_SUCCESS,
    payload: data
  }
}

