import * as actionTypes from './actionTypes';
import axios from 'axios';
import setAuthToken from '../setAuthToken/setAuthToken';


const URL = 'http://localhost:5000/user/login';

export const login = (values) => {
  return dispatch => {
    dispatch(loginStart());
    axios.post(`${URL}`, values)
    .then(response => {
      const token = response.data.token;
      dispatch(loginSuccess(token));
      window.location.replace(`http://localhost:3000/`);
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const loginStart = () => {
  return{
    type: actionTypes.LOGIN_START
  }
}

export const loginSuccess = (token) => {
  localStorage.setItem('jwt', token);
  setAuthToken(token)
  return{
    type: actionTypes.LOGIN_SUCCESS,
    payload: token
  }
}


export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('jwt');
    if(!token) {
      console.log('no')
    }else {
        dispatch(loginSuccess(token));
      }
      
    }
  }


export const logout = () => {
  const token = localStorage.getItem('jwt');
  return dispatch => {
    dispatch(logoutSucces())
  }
}

export const logoutSucces = () => {
  localStorage.removeItem('jwt');
  return{
    type: actionTypes.LOGOUT_SUCCESS
  }
}