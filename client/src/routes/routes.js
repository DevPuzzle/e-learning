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
import AdminContaner from '../containers/AdminContainer/AdminContaner';

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
          <PrivateRoute redir='/' exact path='/admin' component={AdminContaner} />
          <PrivateRoute path='/schools' exact redir='/' component={SchoolsContainer} /> 
          <PrivateRoute path='/profile' exact redir='/' component={Profile} />  
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