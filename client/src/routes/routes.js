import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer/HomeContainer';
import { connect } from 'react-redux';
import * as actions from '../actions/loginActions';
import Profile from '../components/Profile/Profile';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import PrivateRoute from '../hoc/privateRoute';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';
import VerifyEmailPage from '../components/VerifyEmailPage/VerifyEmailPage';
import AdminContaner from '../containers/AdminContainer/AdminContaner';
import AdminPrivateRoute from '../hoc/adminPrivateRoute';
import SignUpConfirmEmail from '../components/SignUp/SignUpConfirmEmail/SignUpConfirmEmail';
import MyCoursesContainer from '../containers/MyCoursesContainer/MyCoursesContainer';
import MySchoolsContainer from '../containers/MySchoolsContainer/MySchoolsContainer';
import SchoolElement from '../components/UI/Templates/SchoolElement/SchoolElement';
import CourseElement from '../components/UI/Templates/CourseElement/CourseElement';

class Routes extends Component {

componentWillMount(){
   this.props.onTryAutoLogin();
 }

render(){  
  return(
    <div style={ this.props.location.pathname.includes('admin') ? {
      display: 'none'
    }: {display: 'block'}}>
      <Header />
        <Switch>          
          <AdminPrivateRoute redir='/' exact path='/admin' component={AdminContaner} />
          <Route path='/confirmEmail' exact component={SignUpConfirmEmail}/>
          <PrivateRoute path='/myCourses' redir='/' component={MyCoursesContainer} />
          <PrivateRoute path='/mySchools' redir='/' component={MySchoolsContainer} /> 
          <PrivateRoute path='/profile' exact redir='/' component={Profile} />  
          <Route path='/course/:name'  exact render={(props) => <CourseElement {...props} course={this.props.course ? this.props.course.course : null}/> } />
          <Route path='/school/:name' exact component={SchoolElement}/>
          <Route path='/verifyEmail/:code' exact component={VerifyEmailPage}/>
          <Route path='/errorPage' exact component={ErrorComponent}/>
          <Route path='/' component={HomeContainer}/>
        </Switch>
      <Footer />
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
   profile: state.profile.userData,
   course: state.courseReducer.course
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));