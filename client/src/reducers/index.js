import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signup from '../reducers/signupReducer';
import login from '../reducers/loginReducer';
export default combineReducers({
  form: formReducer,
  signup,
  login
})