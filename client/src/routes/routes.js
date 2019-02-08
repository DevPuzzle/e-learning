import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer/HomeContainer';
import SchoolsContainer from '../containers/SchoolsContainer/SchoolsContainer';
import { connect } from 'react-redux';
import * as actions from '../actions/loginActions';
import Profile from '../components/Profile/Profile';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
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
          <Route path='/profile' component={Profile} />   
          <Route path='/schools' component={SchoolsContainer} /> 
          <Route path='/' component={HomeContainer}/>
          {/* <Redirect from='/' to='/home' /> */}
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