import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/adminActions/loginActions';
import AdminContaner from '../containers/AdminContainer/AdminContaner';
import PrivateRoute from '../hoc/privateRoute';


class AdminRoutes extends Component {
  
 componentDidMount(){
  this.props.onTryAutoLogin();
}

 
render(){  

  return(
    <div style={ !this.props.location.pathname.includes('admin') ? {
      display: 'none'
    }: {display: 'block'}}>
    <Switch>
      <PrivateRoute exact redir='/loginadmin' path='/admin' component={AdminContaner} />
    </Switch>
    </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(null,mapDispatchToProps)(AdminRoutes));
