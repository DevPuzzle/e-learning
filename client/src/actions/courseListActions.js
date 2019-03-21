import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = `${window.location.origin}/api/course/catalog/list`;

export const getCourseList = () => {
  return dispatch => {
    dispatch(getCourseListStart());
    axios.get(`${URL}`)
    .then(response => {
      
      dispatch(getCourseListSuccess(response.data))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const getCourseListStart = () => {
  return {
    type: actionTypes.GET_COURSELIST_START
  }
}

export const getCourseListSuccess = (data) => {
  return {
    type: actionTypes.GET_COURSELIST_SUCCESS,
    payload: data
  }
}