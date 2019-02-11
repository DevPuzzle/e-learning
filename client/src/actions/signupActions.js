import * as actionTypes from './actionTypes';
import axios from 'axios';


const URL = 'http://localhost:5000/user/signup';



export const signup = (values) => {
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

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  }
}

export const  signUpSuccess = (data) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    payload: data
  }
}