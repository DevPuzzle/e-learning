import React, { Component } from 'react';
import './MyCoursesContainer.scss';
import { NavLink, Switch, Route } from 'react-router-dom';
import MyCoursesInstructor from '../../components/MyCoursesComponents/MyCoursesInstructor/MyCoursesInstructor';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import MyCoursesCollection from '../../components/MyCoursesComponents/MyCoursesCollection/MyCoursesCollection';


class MyCoursesContainer extends Component {


  render() {
    return (
      <React.Fragment>
      <section className='myCourses'>
        <div className='myCourses__nav'>
          <div className='container'>
            <div className='row pt-5'>
              <div className='col-md-12 mb-3'>
              <h3 className='myCourses__title'>
                My Courses
              </h3>
              </div>
              <div className='myCourses__navItems col-md-12 d-flex'>
                <div className='myCourses__navItem'>
                <NavLink exact activeClassName='myCourses__navActive' to='/myCourses'>
                  Collection
                </NavLink>
                </div>
                <div className='myCourses__navItem'>
                <NavLink activeClassName='myCourses__navActive' to='/myCourses/instructor'>
                  Instructor
                </NavLink>
                </div>
              </div>
            </div>
          </div>  
        </div>
        </section>
        <section className='myCourses__content'>
         <div className='container'>
         <div className='instructor row py-5'>
          <Switch>
            <Route path='/myCourses' exact component={MyCoursesCollection} />
            <Route path='/myCourses/instructor' exact component={MyCoursesInstructor}/>
            <Route component={ErrorComponent} /> 
          </Switch>
          </div>
        </div>
        </section>
      </React.Fragment>
    )
  }
}


export default (MyCoursesContainer);
