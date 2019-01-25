import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signup from '../reducers/signupReducer';
import login from '../reducers/loginReducer';
import profile from '../reducers/profileReducer';

export default combineReducers({
  form: formReducer,
  signup,
  login,
  profile
})