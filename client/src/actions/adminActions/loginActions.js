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
      dispatch(loginSuccess(token));
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

export const loginSuccess = (token) => {
  localStorage.setItem('admintoken', token);
  console.log(token)
  setAuthToken(token);
  return {
    type: actionTypes.LOGIN_ADMIN_SUCCESS,
    payload: token
  }
}

export const authCheck = (props) => {
  
  return dispatch => {
    const token = localStorage.getItem('admintoken');
     if(token){
        dispatch(loginSuccess(token));/* 
        props.history.push('/admin') */
      }      
    }
  }
