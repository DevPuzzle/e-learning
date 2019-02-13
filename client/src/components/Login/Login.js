import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.scss';
import LoginForm from './LoginForm/LoginForm';
import * as actions from '../../actions/loginActions';
import Spinner from '../UI/Spinner/Spinner';
import { withRouter } from 'react-router';

class Login extends Component {

  submit = (values) => {
    this.props.onLoginUser(values);
    
  }

  render(){ 
    let loginForm = <LoginForm 
    onSubmit={this.submit}/>;
    if(this.props.loading){
      loginForm = <Spinner />
    }

  return(
    <div className='login'>
      {loginForm}
    </div>
  )
}
}



const mapStateToProps = (state) => {
  return {
    loading: state.login.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUser: (values) => dispatch(actions.login(values))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
