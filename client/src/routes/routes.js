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
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';
import VerifyEmailPage from '../components/VerifyEmailPage/VerifyEmailPage';

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
        {/*   <PrivateRoute path='/user/verify' component={Verify} /> */}
          {/* <Redirect from='/' exact to='/home' /> */}
          <PrivateRoute path='/schools' exact redir='/login' component={SchoolsContainer} /> 
          <PrivateRoute path='/profile' exact redir='/login' component={Profile} />  
          <Route path='/verifyEmail/:code' exact component={VerifyEmailPage}/>
          <Route path='/errorPage' exact component={ErrorComponent}/>
          <Route path='/' component={HomeContainer}/>
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