import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer/HomeContainer';
import SchoolsContainer from '../containers/SchoolsContainer/SchoolsContainer';
import { connect } from 'react-redux';
import * as actions from '../actions/loginActions';
import Profile from '../components/Profile/Profile';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import PrivateRoute from '../hoc/privateRoute';
import ErrorPage from './ErrorPage';
class Routes extends Component {

 componentDidMount(){
   this.props.onTryAutoLogin();
 }

render(){  

  return(
    <div style={ this.props.location.pathname.includes('admin') ? {
      display: 'none'
    }: {display: 'block'}}>
      <Header />
        <Switch>  
          <PrivateRoute path='/profile' redir='/home/login' component={Profile} />   
          <PrivateRoute path='/schools' redir='/home/login' component={SchoolsContainer} /> 
          <Route path='/' component={HomeContainer}/>
          <Route component={ErrorPage} />
        </Switch>
        
      <Footer />
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(null, mapDispatchToProps)(Routes));