import * as actionTypes from './actionTypes';
import axios from 'axios';

const URL = `${window.location.origin}/api/course`;
const fetchUrl = `${window.location.origin}/api/course/covers/instructor`;



export const getCourseCovers = () => {
  return dispatch => {
    dispatch(getCourseCoversStart());
    axios.get(`${fetchUrl}`)
    .then(response => {
      dispatch(getCourseCoversSuccess(response.data.user_courses_covers));
    })
    .catch(err => {
      console.log(err);
      
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
     dispatch(updateCourseCoverSuccess(response.data.course_cover))
    })
    .catch(err => {
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


//ONE COURSE
export const getCourse = (id) => {
  return dispatch => {
    dispatch(getCourseStart());
    axios.get(`${URL}/${id}`)
    .then(response => {
      dispatch(getCourseSuccess(response.data.course))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const getCourseStart = () => {
  return {
    type: actionTypes.GET_COURSE_START
  }
}

export const getCourseSuccess = (data) => {
  return {
    type: actionTypes.GET_COURSE_SUCCESS,
    payload: data
  }
}

export const getCourseCollection = () => {
  return dispatch => {
    dispatch(getCourseCollectionStart());
    axios.get(`${window.location.origin}/api/course/collection/get`)
    .then(response => {
      dispatch(getCourseCollectionSuccess(response.data.user_course_collection))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const getCourseCollectionStart = () => {
  return {
    type: actionTypes.GET_COURSECOLLECTION_START
  }
}

export const getCourseCollectionSuccess = (data) => {
  return {
    type: actionTypes.GET_COURSECOLLECTION_SUCCESS,
    payload: data
  }
}


export const deleteCourseCollection = (id) => {
  return dispatch => {
    dispatch(deleteCourseCollectionStart());
    axios.delete(`${window.location.origin}/api/course/collection/delete/${id}`)
    .then(response => {
      dispatch(deleteCourseCollectionSuccess(id));
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const deleteCourseCollectionStart = () => {
  return {
    type: actionTypes.DELETE_COURSECOLLECTION_START
  }
}

export const deleteCourseCollectionSuccess = (id) => {
  return {
    type: actionTypes.DELETE_COURSECOLLECTION_SUCCESS,
    payload: id
  }
}