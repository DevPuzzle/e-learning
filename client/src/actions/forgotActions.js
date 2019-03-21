import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = `${window.location.origin}/api/user/forgotten/password`;

export const forgot = (values) => {
  return dispatch => {
    dispatch(forgotStart());
    axios.patch(`${URL}`, values)
    .then(response => {
      dispatch(forgotSuccess());
    })
    .catch(err => {
      dispatch(forgotFail())
    })
  }
}

export const forgotStart = () => {
  return {
    type: actionTypes.FORGOT_START
  }
}

export const forgotSuccess = () => {
  return {
    type: actionTypes.FORGOT_SUCCESS
  }
}

export const forgotFail = () => {
  return {
    type: actionTypes.FORGOT_FAIL
  }
}

export const reset = () => {
  return {
    type: actionTypes.RESET_FORGOT
  }
}