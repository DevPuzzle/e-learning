import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/loginActions';
import AdminContaner from '../containers/AdminContainer/AdminContaner';
import AdminLogin from '../components/AdminComponents/AdminLogin/AdminLogin';


class AdminRoutes extends Component {

 
render(){  

  return(
    <div style={ !this.props.location.pathname.includes('admin') ? {
      display: 'none'
    }: {display: 'block'}}>
    <Switch>
      <Route path='/admin' component={AdminContaner} />
      <Route path='/loginadmin' component={AdminLogin} />
      
    </Switch>

    </div>
    )
  }
}




export default withRouter(AdminRoutes);