import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = `${window.location.origin}/api/user`;

export const passwordChange = (values) => {
  return dispatch => {
    dispatch(changePasswordStart());
    axios.patch(`${URL}/edit/password`, values)
    .then(response => {
      dispatch(changePasswordSuccess(response.data));
    })
    .catch(err => {
      dispatch(changePasswordFail())
    })
  }
}

export const changePasswordFail = () => {
  return {
    type: actionTypes.PASSWORD_CHANGE_FAIL
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
    .catch(err => {
      dispatch(changeUserDataFail());
    })
  }
}

export const changeUserDataFail = () => {
  return {
    type: actionTypes.USERDATA_CHANGE_FAIL
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
      dispatch(avatarUploadSuccess(response.data));
    })
    .catch(err => {
      dispatch(avatarUploadFail());
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

export const avatarUploadFail = () => {
  return {
    type: actionTypes.AVATAR_UPLOAD_FAIL
  }
}

