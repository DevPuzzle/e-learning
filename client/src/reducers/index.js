import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signup from './signupReducer';
import login from './loginReducer';
import profile from './profileReducer';
import loginAdmin from './adminReducers/loginReducer';
import categories from './adminReducers/categoriesReducer';
import subcategories from './adminReducers/subCategoriesReducer';
import themes from './adminReducers/themesReducer';
import verifyEmail from './verifyReducer';
import forgotPassword from './forgotPasswordReducer';
import courseList from './courseListReducer';
import courseCovers from './courseCoverReducer';
import schoolCovers from './schoolCoverReducer';
import courseReducer from './courseReducer';
import schoolReducer from './schoolReducer';

export default combineReducers({
  form: formReducer,
  signup,
  login,
  profile,
  loginAdmin,
  categories,
  subcategories,
  themes,
  verifyEmail,
  forgotPassword,
  courseList,
  courseCovers,
  schoolCovers,
  courseReducer,
  schoolReducer
})