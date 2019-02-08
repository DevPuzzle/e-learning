import React, { Component } from 'react';
import SignUpForm from './SignUpForm/SignUpForm';
import { connect } from 'react-redux';
import * as actions from '../../actions/signupActions';

class SignUp extends Component {

  submit = (values) => {/* 
    this.props.onSignUpUser(values) */
    console.log(values);
  }

  render(){
    
    
    return(
      <SignUpForm
      loading={this.props.loading}
      onSubmit={this.submit}/>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    loading: state.signup.loading
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpUser: (values) => dispatch(actions.signup(values))
  }
}


export default connect(mapStateToProps, mapDispatchToProps )(SignUp);
