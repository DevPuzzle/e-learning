import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signup from '../reducers/signupReducer';
import login from '../reducers/loginReducer';
import profile from '../reducers/profileReducer';
import loginAdmin from './adminReducers/loginReducer';

export default combineReducers({
  form: formReducer,
  signup,
  login,
  profile,
  loginAdmin
})