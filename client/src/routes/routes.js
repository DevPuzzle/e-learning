import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer/HomeContainer';
import SchoolsContainer from '../containers/SchoolsContainer/SchoolsContainer';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';


const Routes = () => {
  return(
    <Switch>
      <Route path='/' exact component={HomeContainer}/>
      <Route path='/schools' component={SchoolsContainer} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />
    </Switch>
  )
}

export default Routes;