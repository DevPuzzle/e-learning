import * as actionTypes from './actionTypes';
import axios from 'axios';


const URL = 'http://owlunion.com/user/signup';



export const signup = (values, history) => {
  return dispatch => {
    dispatch(signupStart());
    axios.post(`${URL}`, values)
    .then(response => {
      dispatch(signUpSuccess(values.email));
      history.push('/confirmEmail');
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