import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer/HomeContainer';
import SchoolsContainer from '../containers/SchoolsContainer/SchoolsContainer';
import { connect } from 'react-redux';
import * as actions from '../actions/loginActions';
import SignUp from '../components/SignUp/SignUp';

class Routes extends Component {

 componentDidMount(){
   this.props.onTryAutoLogin();
 }

  render(){  
  return(
    <Switch>
      <Route path='/signup' component={SignUp} />
      <Route path='/schools' component={SchoolsContainer} /> 
      <Route path='/home' component={HomeContainer}/>
      <Redirect from='/' to='/home' />
    </Switch>
  )
}
}




const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
    }
  }



export default withRouter(connect(null, mapDispatchToProps)(Routes));