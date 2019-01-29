import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.scss';
import LoginForm from './LoginForm/LoginForm';
import * as actions from '../../actions/loginActions';

class Login extends Component {

  submit = (values) => {
    console.log(values)
    this.props.onLoginUser(values);
    
  }

  render(){ 
  return(
    <div className='login'>
      <LoginForm 
        onSubmit={this.submit}/>
    </div>
  )
}
}




const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUser: (values) => dispatch(actions.login(values))
  }
}



export default connect(null, mapDispatchToProps)(Login);
