import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = 'http://localhost:5000/user';

export const passwordChange = (username, values) => {
  return dispatch => {
    dispatch(changePasswordStart());
    console.log(username)
    axios.patch(`${URL}/edit/password/${username}`, values)
    .then(response => {
      dispatch(changePasswordSuccess(response.data));
    })
  }
}

export const changePasswordStart = () => {
  return {
    type: actionTypes.PASSWORD_CHANGE_START
  }
}

export const changePasswordSuccess = (data) => {
  return {
    type: actionTypes.PASSWORD_CHANGE_SUCCESS,
    payload: data
  }
}

export const userDataChange = (username, values) => {
  return dispatch => {
    dispatch(changeUserDataStart());
    axios.patch(`${URL}/edit/${username}`, values)
    .then(response => {
      dispatch(changeUserDataSuccess(response.data));
      console.log(response.data)
    })
  }
}

export const changeUserDataStart = () => {
  return {
    type: actionTypes.USERDATA_CHANGE_START
  }
}

export const changeUserDataSuccess = (data) => {
  return {
    type: actionTypes.USERDATA_CHANGE_SUCCESS,
    payload: data
  }
}

export const getUserData = () => {
  return dispatch => {
    const username = localStorage.getItem('username');
    dispatch(getUserDataStart());
    axios.get(`${URL}/${username}`)
    .then(response => {
      dispatch(getUserDataSuccess(response.data))
    })
  }
}

export const getUserDataStart = () => {
  return {
    type: actionTypes.GET_USERDATA_START
  }
}

export const getUserDataSuccess = (data) => {
  return{
    type: actionTypes.GET_USERDATA_SUCCESS,
    payload: data
  }
}

export const avatarUpload = (image) => {
  console.log('1', image.name);
  return dispatch => {
    const username = localStorage.getItem('username');
    const formData = new FormData();
    formData.append('userImage', image)
    dispatch(avatarUploadStart());
    console.log('2');
    axios.patch(`${URL}/avatar/uploads/${username}`, formData)
    .then(response => {
      console.log(dispatch(avatarUploadSuccess(response.data)));
      console.log('3', response.data);
    })
  }
}


export const avatarUploadStart = () => {
  return {
    type: actionTypes.AVATAR_UPLOAD_START
  }
}

export const avatarUploadSuccess = (data) => {
  console.log('avatarUploadSucces', data)
  return{
    type: actionTypes.AVATAR_UPLOAD_SUCCESS,
    payload: data
  }
}