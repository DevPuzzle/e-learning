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

//ADD

export const addSchoolCover = (data) => {
  return dispatch => {
    dispatch(addSchoolCoverStart());
    axios.post(`${URL}/school/create`, data)
    .then(response => {
      dispatch(addSchoolCoverSuccess(response.data))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const addSchoolCoverStart = () => {
  return {
    type: actionTypes.ADD_SCHOOLCOVER_START
  }
}

export const addSchoolCoverSuccess = (data) => {
  return {
    type: actionTypes.ADD_SCHOOLCOVER_SUCCESS,
    payload: data
  }
}

export const deleteSchoolCover = (id) => {
  return dispatch => {
    dispatch(deleteSchoolCoverStart());
    axios.delete(`${URL}/school/delete/${id}`)
    .then(response => {
      console.log(id)
      dispatch(deleteSchoolCoverSuccess(id))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const deleteSchoolCoverStart = () => {
  return {
    type: actionTypes.DELETE_SCHOOLCOVER_START
  }
}

export const deleteSchoolCoverSuccess = (id) => {
  return {
    type: actionTypes.DELETE_SCHOOLCOVER_SUCCESS,
    payload: id
  }
}