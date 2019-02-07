import * as actionTypes from '../actionTypes';
import axios from 'axios';


const URL = 'http://localhost:5000/category';


export const getCategories = () => {
  return dispatch => {
    dispatch(getCategoriesStart());
    axios.get(`${URL}/list`)
    .then(response => {
      dispatch(getCategoriesSuccess(response.data));
    })
  }
}

export const getCategoriesStart = () => {
  return {
    type: actionTypes.GET_CATEGORIES_START
  }
}

export const getCategoriesSuccess = (data) => {
  return {
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    payload: data
  }
}