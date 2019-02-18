import React, { Component } from 'react';
import SignUpForm from './SignUpForm/SignUpForm';
import { connect } from 'react-redux';
import * as actions from '../../actions/signupActions';
import { withRouter } from 'react-router';

class SignUp extends Component {
  state = {
    showConfirm: false
  } 

  submit = (values) => {
    const data = {
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      name: values.name.trim(),
      email: values.email,
      password: values.password,
      confirm_password: values.confirm_password,
      role: values.role
    }
    this.props.onSignUpUser(data, this.props.history)
    this.setState({showConfirm : true})
  }

  render(){   
    
    return(
      <SignUpForm
      loading={this.props.loading}
      showConfirm={this.state.showConfirm}
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
    onSignUpUser: (values, history) => dispatch(actions.signup(values, history))
  }
}


export default connect(mapStateToProps, mapDispatchToProps )(withRouter(SignUp));
