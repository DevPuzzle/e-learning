import * as actionTypes from '../actionTypes';
import axios from 'axios';


const URL = 'http://localhost:5000/category';

//CATEGORIES
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

export const updateCategory = (values, categoryId) => {
  return dispatch => {
    dispatch(updateCategoryStart());
    axios.patch(`${URL}/edit/${categoryId}`, values)
    .then(response => {
      dispatch(updateCategorySuccess(response.data.category));
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const updateCategoryStart = () => {
  return {
    type: actionTypes.UPDATE_CATEGORY_START
  }
}

export const updateCategorySuccess = (data) => {
  return {
    type: actionTypes.UPDATE_CATEGORY_SUCCESS,
    payload: data
  }
}

export const addCategory = (values) => {
  return dispatch => {
    dispatch(addCategoryStart());
    axios.post(`${URL}/create`, values)
    .then(response => {
      dispatch(addCategorySuccess(response.data.category))
    })
  }
}

export const addCategoryStart = () => {
  return {
    type: actionTypes.ADD_CATEGORY_START
  }
}

export const addCategorySuccess = (data) => {
  return {
    type: actionTypes.ADD_CATEGORY_SUCCESS,
    payload: data
  }
}

//action delete