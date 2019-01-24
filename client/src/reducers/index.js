import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signup from '../reducers/signupReducer';
import login from '../reducers/loginReducer';
import user from '../reducers/userReducer';

export default combineReducers({
  form: formReducer,
  signup,
  login,
  user
})