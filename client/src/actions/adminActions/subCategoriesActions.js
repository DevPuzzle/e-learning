import * as actionTypes from '../actionTypes';
import axios from 'axios';


const URL = 'http://localhost:5000/category';

export const getSubCategories = (categoryId) => {
  console.log('CATEGORY ID',categoryId)
  return dispatch => {
    dispatch(getSubCategoriesStart());
    axios.get(`${URL}/${categoryId}/subcategories`)
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

