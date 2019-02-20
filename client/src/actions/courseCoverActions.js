import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = 'http://localhost:5000/course/cover/create';
const fetchUrl = 'http://localhost:5000/user/course';


export const getCourseCovers = () => {
  return dispatch => {
    dispatch(getCourseCoversStart());
    axios.get(`${fetchUrl}`)
    .then(response => {
      dispatch(getCourseCoversSuccess(response.data))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const getCourseCoversStart = () => {
  return {
    type: actionTypes.GET_COURSECOVERS_START
  }
}

export const getCourseCoversSuccess = (data) => {
  console.log('COURSE COVER DATA', data)
  return {
    type: actionTypes.GET_COURSECOVERS_SUCCESS,
    payload: data
  }
}

export const addCourseCover = () => {
  return dispatch => {
    dispatch(addCourseCoverStart());
    axios.get(`${URL}`)
    .then(response => {
      
      dispatch(addCourseCoverSuccess(response.data))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const addCourseCoverStart = () => {
  return {
    type: actionTypes.GET_COURSELIST_START
  }
}

export const addCourseCoverSuccess = (data) => {
  return {
    type: actionTypes.GET_COURSELIST_SUCCESS,
    payload: data
  }
}