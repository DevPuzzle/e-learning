import React, { Component } from 'react';
import AdminLoginForm from './AdminLoginForm/AdminLoginForm';
import './AdminLogin.scss';
import { connect } from 'react-redux';
import * as actions from '../../../actions/adminActions/loginActions';
import { withRouter } from 'react-router';

class AdminLogin extends Component {


  submit = (values) => {
    this.props.onLoginAdmin(values, this.props.history);
  }

  render() {
    return (
      <div className='adminLogin'>
        <AdminLoginForm 
          onSubmit={this.submit}/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    login: state.loginAdmin.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginAdmin: (values, history) => dispatch(actions.login(values, history))
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminLogin));
