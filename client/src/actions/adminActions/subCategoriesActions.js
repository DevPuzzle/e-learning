import * as actionTypes from '../actionTypes';
import axios from 'axios';
import {resetThemes} from './themesActions';

const URL = `${window.location.origin}/api`;

export const getSubCategories = (categoryId) => {

  return dispatch => {
    dispatch(resetThemes());
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

export const addSubcategory = (values,categoryId) => {
  return dispatch => {
    dispatch(addSubcategoryStart());
    axios.post(`${URL}/subcategory/create`, {name: values.name, description:values.description, cat_id: categoryId})
    .then(response => {
      dispatch(addSubcategorySuccess(response.data.subcategory))
    })
  }
}

export const addSubcategoryStart = () => {
  return {
    type: actionTypes.ADD_SUBCATEGORY_START
  }
}

export const addSubcategorySuccess = (data) => {
  return {
    type: actionTypes.ADD_SUBCATEGORY_SUCCESS,
    payload: data
  }
}

// delete subcategory
export const deleteSubcategory = (id) => {
  return dispatch => {  
    axios.delete(`${URL}/subcategory/delete/${id}`)
    .then(res => {
      console.log(res);
      dispatch(deleteSubcategorySuccess(id));
    })
  }
}

export const deleteSubcategorySuccess = (data) => {
  return {
    type: actionTypes.DELETE_SUBCATEGORY_SUCCESS,
    payload: data
  }
}