import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, redir, ...rest, }) => (
  <Route {...rest} render = { props => {
    return(
      localStorage.getItem('jwt')
      ? <Component {...props} />
      : <Redirect to={{pathname: redir, state: { from: props.location}}} />
    )
    
  }} />
)

export default PrivateRoute;
