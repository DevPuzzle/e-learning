import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signup from '../reducers/signupReducer';
import login from '../reducers/loginReducer';
import profile from '../reducers/profileReducer';
import loginAdmin from './adminReducers/loginReducer';
import categories from './adminReducers/categoriesReducer';

export default combineReducers({
  form: formReducer,
  signup,
  login,
  profile,
  loginAdmin,
  categories
})