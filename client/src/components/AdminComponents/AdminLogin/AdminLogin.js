import React, { Component } from 'react';
import AdminLoginForm from './AdminLoginForm/AdminLoginForm';
import './AdminLogin.scss';

class AdminLogin extends Component {

  
  render() {
    return (
      <div className='adminLogin'>

        <AdminLoginForm />
      </div>
    )
  }
}

export default AdminLogin;
