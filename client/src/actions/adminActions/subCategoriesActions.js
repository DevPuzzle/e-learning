import * as actionTypes from '../actionTypes';
import axios from 'axios';


const URL = 'http://localhost:5000';

export const getSubCategories = (categoryId) => {
  return dispatch => {
    dispatch(getSubCategoriesStart());
    axios.get(`${URL}/category/${categoryId}/subcategories`)
    .then(response => {
      dispatch(getSubcategoriesSuccess(response.data.subcategories));
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const getSubCategoriesStart = () => {
  return {
    type: actionTypes.GET_SUBCATEGORIES_START
  }
}

export const getSubcategoriesSuccess = (data) => {
  console.log(data)
  return {
    type: actionTypes.GET_SUBCATEGORIES_SUCCESS,
    payload: data
  }
}


export const updateSubCategory = (values, subcategoryId) => {
  return dispatch => {
    dispatch(updateSubCategoryStart());
    axios.patch(`${URL}/subcategory/edit/${subcategoryId}`, values)
    .then(response => {
      dispatch(updateSubCategorySuccess(response.data.subcategory));
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const updateSubCategoryStart = () => {
  return {
    type: actionTypes.UPDATE_SUBCATEGORY_START
  }
}

export const updateSubCategorySuccess = (data) => {
  return {
    type: actionTypes.UPDATE_SUBCATEGORY_SUCCESS,
    payload: data
  }
}

