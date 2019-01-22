import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer/HomeContainer';
import SchoolsContainer from '../containers/SchoolsContainer/SchoolsContainer';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import { connect } from 'react-redux';
import * as actions from '../actions/loginActions';

class Routes extends Component {

 componentDidMount(){
   this.props.onTryAutoLogin();
 }

  render(){  
  return(
    <Switch>
      <Route path='/' exact component={HomeContainer}/>
      <Route path='/schools' component={SchoolsContainer} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />
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