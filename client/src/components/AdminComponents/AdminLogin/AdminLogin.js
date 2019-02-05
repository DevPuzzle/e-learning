import React, { Component } from 'react';
import AdminLoginForm from './AdminLoginForm/AdminLoginForm';
import './AdminLogin.scss';
import { connect } from 'react-redux';
import * as actions from '../../../actions/adminActions/loginActions';
import { withRouter } from 'react-router';

class AdminLogin extends Component {


  submit = (values) => {
    console.log(values)
    this.props.onLoginAdmin(values);
    
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



const mapDispatchToProps = (dispatch) => {
  return {
    onLoginAdmin: (values) => dispatch(actions.login(values))
    
  }
}

export default connect(null, mapDispatchToProps)(withRouter(AdminLogin));
