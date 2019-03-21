import * as actionTypes from './actionTypes';
import axios from 'axios';
import setAuthToken from '../setAuthToken/setAuthToken';
import { getUserData} from './profileActions';
import jwtDecode from 'jwt-decode';

const URL = `${window.location.origin}/api/user/login`;

export const login = (values, history) => {
  return dispatch => {    
    dispatch(loginStart());
    axios.post(`${URL}`, values)
    .then(response => {      
      const token = response.data.token;
      const username = response.data.username;
      const role = response.data.role;
      dispatch(loginSuccess(token, username, role));
      dispatch(getUserData())
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

export const loginSuccess = (token, username, role) => {
  localStorage.setItem('jwt', token);
  localStorage.setItem('username', username);
  localStorage.setItem('role', role)
  const data = {token: token, username: username, role: role}
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
    const role = localStorage.getItem('role');
    if(!token){
        dispatch(logout());
      }else {
        const decodedToken = jwtDecode(token);
        if(decodedToken.exp <= new Date() / 1000) {
          dispatch(logout());
        }else {
          dispatch(loginSuccess(token, username, role));
          dispatch(getUserData());
        }
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
  localStorage.removeItem('role')
  return{
    type: actionTypes.LOGOUT_SUCCESS
  }
}