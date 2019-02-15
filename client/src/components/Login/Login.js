import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.scss';
import LoginForm from './LoginForm/LoginForm';
import * as actions from '../../actions/loginActions';
import Spinner from '../UI/Spinner/Spinner';
import { withRouter } from 'react-router';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import { forgot, reset } from '../../actions/forgotActions';
class Login extends Component {

  state = {
    openForgotPasswordModal: false,
  };

  handleClickOpenForgotPasswordModal = () => {
    this.setState({ openForgotPasswordModal: true });
  };
  handleClose = () => {
    this.setState({ openForgotPasswordModal: false });
    this.props.onReset();
  };

  submit = (values) => {
    const data = {
      email: values.email.trim(),
      password: values.password
    }
    this.props.onLoginUser(data, this.props.history);
  }
  changePasswordHandler = (values) => {
    this.props.onForgotPassword(values);

  }

  render(){ 
    console.log(this.props)
    let loginForm = <LoginForm
    openModal={this.handleClickOpenForgotPasswordModal}
    userError={this.props.error} 
    onSubmit={this.submit}/>;
    if(this.props.loading){
      loginForm = <Spinner />
    }
  return(
    <div className='login'>
     <ForgotPassword 
      forgotPassword={this.props.forgotPassword}
      changePasswordHandler={this.changePasswordHandler}
      open={this.state.openForgotPasswordModal}
      onClose={this.handleClose}/>
      {loginForm}
    </div>
  )
}
}



const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    error: state.login.error,
    forgotPassword: state.forgotPassword
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUser: (values, history) => dispatch(actions.login(values, history)),
    onForgotPassword: (values) => dispatch(forgot(values)),
    onReset: () => dispatch(reset())

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
