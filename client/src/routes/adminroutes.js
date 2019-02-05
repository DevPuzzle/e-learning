import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/adminActions/loginActions';
import AdminContaner from '../containers/AdminContainer/AdminContaner';
import AdminLogin from '../components/AdminComponents/AdminLogin/AdminLogin';
import AdminComponent from '../components/AdminComponents/AdminComponent';


class AdminRoutes extends Component {
  
 componentDidMount(){
   console.log(this.props)
  this.props.onTryAutoLogin(this.props);
}

 
render(){  

  return(
    <div style={ !this.props.location.pathname.includes('admin') ? {
      display: 'none'
    }: {display: 'block'}}>
    <Switch>
      <Route exact path='/loginadmin' component={AdminLogin} />
      <Route exact path='/admin' component={AdminContaner} />
    </Switch>

    </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: (props) => dispatch(actions.authCheck(props))
  }
}
export default withRouter(connect(null,mapDispatchToProps)(AdminRoutes));