import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom';
import MySchoolsCollection from '../../components/MySchoolsComponent/MySchoolsCollection/MySchoolsCollection';
import MySchoolsInstructor from '../../components/MySchoolsComponent/MySchoolsInstructor/MySchoolsInstructor';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import './MySchoolsContainer.scss';

class MySchoolsContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <section className='mySchools'>
          <div className='mySchools__nav'>
            <div className='container'>
              <div className='row pt-5'>
                <div className='col-md-12 mb-3'>
                  <h3 className='mySchools__title'>
                    My Schools
                  </h3>
                </div>
                <div className='mySchools__navItems col-md-12 d-flex'>
                  <div className='mySchools__navItem'>
                    <NavLink exact activeClassName='mySchools__navActive' to='/mySchools'>
                      Collection
                    </NavLink>
                  </div>
                  <div className='mySchools__navItem'>
                    <NavLink activeClassName='mySchools__navActive' to='/mySchools/instructor'>
                      Instructor
                    </NavLink>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='mySchools__content'>
          <div className='container'>
          <div className='instructor row py-5'>
            <Switch>
              <Route path='/mySchools' exact component={MySchoolsCollection} />
              <Route path='/mySchools/instructor' exact component={MySchoolsInstructor}/>
              <Route component={ErrorComponent} /> 
            </Switch>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default MySchoolsContainer;
