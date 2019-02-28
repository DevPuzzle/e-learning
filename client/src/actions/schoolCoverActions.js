import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = 'http://localhost:5000';

export const getSchoolCovers = () => {
  return dispatch => {
    dispatch(getSchoolCoversStart());
    axios.get(`${URL}/user/school`)
    .then(response => {
      dispatch(getSchoolCoversSuccess(response.data.user_school));
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const getSchoolCoversStart = () => {
  return {
    type: actionTypes.GET_SCHOOLCOVERS_START
  }
}

export const getSchoolCoversSuccess = (data) => {
  return {
    type: actionTypes.GET_SCHOOLCOVERS_SUCCESS,
    payload: data
  }
}