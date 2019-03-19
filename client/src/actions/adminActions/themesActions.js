import * as actionTypes from '../actionTypes';
import axios from 'axios';

const URL = 'http://owlunion.com';

export const getThemes = (subcategoryId) => {
  return dispatch => {
    dispatch(getThemesStart());
    axios.get(`${URL}/subcategory/${subcategoryId}/themes`)
    .then(response => {
      dispatch(getThemesSuccess(response.data.themes));
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const getThemesStart = () => {
  return {
    type: actionTypes.GET_THEMES_START
  }
}

export const getThemesSuccess = (data) => {
  return {
    type: actionTypes.GET_THEMES_SUCCESS,
    payload: data
  }
}

export const updateTheme = (values, themeId) => {
  return dispatch => {
    dispatch(updateThemeStart());
    axios.patch(`${URL}/theme/edit/${themeId}`, values)
    .then(response => {
      dispatch(updateThemeSuccess(response.data.theme));
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const updateThemeStart = () => {
  return {
    type: actionTypes.UPDATE_THEME_START
  }
}

export const updateThemeSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_THEME_SUCCESS,
    payload: data
  }
}

export const resetThemes = () => {
  return {
    type: actionTypes.RESET_THEMES
  }
}

export const addTheme = (values, subcategoryId) => {
  return dispatch => {
    axios.post(`${URL}/theme/create`, {name: values.name, description: values.description, subcat_id: subcategoryId})
    .then(response => {
      dispatch(addThemeSuccess(response.data.theme))
    })
  }
}

export const addThemeSuccess = (data) => {
  return {
    type: actionTypes.ADD_THEME_SUCCESS,
    payload: data
  }
}

export const deleteTheme = (id) => {
  return dispatch => {
    dispatch(deleteThemeStart());
    axios.delete(`${URL}/theme/delete/${id}`)
    .then(response => {
      dispatch(deleteThemeSuccess(id));
    })
  }
}

export const deleteThemeStart = () => {
  return {
    type: actionTypes.DELETE_THEME_START
  }
}

export const deleteThemeSuccess = (data) => {
  return {
    type: actionTypes.DELETE_THEME_SUCCESS,
    payload: data
  }
}