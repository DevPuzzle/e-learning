import React, { Component } from 'react';
import SignUpForm from './SignUpForm/SignUpForm';
import { connect } from 'react-redux';
import * as actions from '../../actions/signupActions';

class SignUp extends Component {
  state = {
    showConfirm: false
  } 

  submit = (values) => {
    this.props.onSignUpUser(values)
    
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
    onSignUpUser: (values) => dispatch(actions.signup(values))
  }
}


export default connect(mapStateToProps, mapDispatchToProps )(SignUp);
