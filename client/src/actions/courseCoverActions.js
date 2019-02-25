import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = 'http://localhost:5000/course';
const fetchUrl = 'http://localhost:5000/user/course_cover';



export const getCourseCovers = () => {
  return dispatch => {
    dispatch(getCourseCoversStart());
    axios.get(`${fetchUrl}`)
    .then(response => {
      dispatch(getCourseCoversSuccess(response.data.user_courses_covers));
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
  return {
    type: actionTypes.GET_COURSECOVERS_SUCCESS,
    payload: data
  }
}

export const addCourseCover = (data) => {
  return dispatch => {
    dispatch(addCourseCoverStart());
    axios.post(`${URL}/cover/create`, data)
    .then(response => {
      dispatch(addCourseCoverSuccess(response.data.course_cover))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const addCourseCoverStart = () => {
  return {
    type: actionTypes.ADD_COURSECOVER_START
  }
}

export const addCourseCoverSuccess = (data) => {
  return {
    type: actionTypes.ADD_COURSECOVER_SUCCESS,
    payload: data
  }
}

export const updateCourseCover = (values, courseCoverId) => {
  return dispatch => {
    dispatch(updateCourseCoverStart());
    axios.patch(`${URL}/edit/${courseCoverId}`, values)
    .then(response => {
      console.log(response)
     dispatch(updateCourseCoverSuccess(response.data))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const updateCourseCoverStart = () => {
  return {
    type: actionTypes.UPDATE_COURSECOVER_START
  }
}

export const updateCourseCoverSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_COURSECOVER_SUCCESS,
    payload: data
  }
}

export const deleteCourseCover = (courseCoverId) => {
  return dispatch => {
    dispatch(deleteCourseCoverStart());
    axios.delete(`${URL}/delete/${courseCoverId}`)
    .then(response => {
      dispatch(deleteCourseCoverSuccess(courseCoverId));
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const deleteCourseCoverStart = () => {
  return {
    type: actionTypes.DELETE_COURSECOVER_START
  }
}

export const deleteCourseCoverSuccess = (id) => {
  return {
    type: actionTypes.DELETE_COURSECOVER_SUCCESS,
    payload: id
  }
}