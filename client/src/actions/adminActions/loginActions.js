import * as actionTypes from '../actionTypes';
import axios from 'axios';
import setAuthToken from '../../setAuthToken/setAuthToken';


const URL = 'http://localhost:5000/admin/login';

export const login = (values, history) => {
  return dispatch => {
    dispatch(loginStart());
    axios.post(`${URL}`, values)
    .then(response => {
      const token = response.data.token;
      const username = response.data.username;
      dispatch(loginSuccess(token, username));
      history.push('/admin');
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_ADMIN_START
  }
}

export const loginSuccess = (token, username) => {
  localStorage.setItem('jwt', token);
  localStorage.setItem('username', username);
  const data = {token: token, username: username}
  setAuthToken(token);
  return {
    type: actionTypes.LOGIN_ADMIN_SUCCESS,
    payload: data
  }
}

export const authCheckState = (props) => {
  
  return dispatch => {
    const token = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');
     if(token){
        dispatch(loginSuccess(token, username));
      }      
    }
  }
