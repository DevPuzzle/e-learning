import * as actionTypes from './actionTypes';
import axios from 'axios';
import setAuthToken from '../setAuthToken/setAuthToken';


const URL = 'http://localhost:5000/user/login';

export const login = (values, history) => {
  return dispatch => {    
    dispatch(loginStart());
    axios.post(`${URL}`, values)
    .then(response => {      
      const token = response.data.token;
      const username = response.data.username;
      dispatch(loginSuccess(token, username));
      history.push('/')
    })
    .catch(err => {
      dispatch(loginFail())
    })
  }
}

export const loginStart = () => {
  return{
    type: actionTypes.LOGIN_START
  }
}

export const loginSuccess = (token, username) => {
  localStorage.setItem('jwt', token);
  localStorage.setItem('username', username);
  const data = {token: token, username: username}
  setAuthToken(token);
  return{
    type: actionTypes.LOGIN_SUCCESS,
    payload: data
  }
}

export const loginFail = () => {
  return {
    type: actionTypes.LOGIN_FAIL
  }
} 

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');
    if(token){
        dispatch(loginSuccess(token, username));
      }
      
    }
  }


export const logout = () => {
  return dispatch => {
    dispatch(logoutSuccess())
  }
}

export const logoutSuccess = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('username');
  return{
    type: actionTypes.LOGOUT_SUCCESS
  }
}