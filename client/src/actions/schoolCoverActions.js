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

export const updateSchoolCover = (data, id) => {

  return dispatch => {
    dispatch(updateSchoolCoverStart());
    axios.patch(`${URL}/school/edit/${id}`, data)
    .then(response => {
      dispatch(updateSchoolCoverSuccess(response.data.school))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const updateSchoolCoverStart = () => {
  return {
    type: actionTypes.UPDATE_SCHOOLCOVER_START
  }
}

export const updateSchoolCoverSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_SCHOOLCOVER_SUCCESS,
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

//ONE SCHOOl
export const getSchool = (id) => {
  return dispatch => {
    dispatch(getSchoolStart());
    axios.get(`${URL}/school/${id}`)
    .then(response => {
      dispatch(getSchoolSuccess(response.data.school))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const getSchoolStart = () => {
  return {
    type: actionTypes.GET_SCHOOL_START
  }
}

export const getSchoolSuccess = (data) => {
  return {
    type: actionTypes.GET_SCHOOL_SUCCESS,
    payload: data
  }
}