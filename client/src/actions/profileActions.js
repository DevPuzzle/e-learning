import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = 'http://localhost:5000/user';

export const passwordChange = (values) => {
  return dispatch => {
    dispatch(changePasswordStart());
    axios.patch(`${URL}/edit/password`, values)
    .then(response => {
      dispatch(changePasswordSuccess(response.data));
    })
    .catch(err => {
      console.log(err)
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


export const userDataChange = (values) => {
  return dispatch => {
    dispatch(changeUserDataStart());
    axios.patch(`${URL}/edit`, values)
    .then(response => {
      dispatch(changeUserDataSuccess(values));
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
    dispatch(getUserDataStart());
    axios.get(`${URL}/profile`)
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
  return dispatch => {
    const username = localStorage.getItem('username');
    const formData = new FormData();
    formData.append('userImage', image)
    dispatch(avatarUploadStart());
    axios.patch(`${URL}/avatar/uploads`, formData)
    .then(response => {
      console.log(response.data)
      dispatch(avatarUploadSuccess(response.data));
    })
  }
}


export const avatarUploadStart = () => {
  return {
    type: actionTypes.AVATAR_UPLOAD_START
  }
}

export const avatarUploadSuccess = (data) => {
  return{
    type: actionTypes.AVATAR_UPLOAD_SUCCESS,
    payload: data
  }
}

