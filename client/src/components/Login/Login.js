import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.scss';
import LoginForm from './LoginForm/LoginForm';
import * as actions from '../../actions/loginActions';

class Login extends Component {

  submit = (values) => {
    this.props.onLoginUser(values);
  }

  render(){ 
  return(
    <section className='login'>
      <div className='login__wrapper'>
      <LoginForm 
        onSubmit={this.submit}/>
      </div>
      
    </section>
  )
}
}


const mapStateToProps = (state) => {
  console.log('STATE',state)
  return {
    
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUser: (values) => dispatch(actions.login(values))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Login);
