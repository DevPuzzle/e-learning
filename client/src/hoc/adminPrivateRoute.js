import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminPrivateRoute = ({ component: Component, redir, ...rest, }) => (
  <Route {...rest} render = { props => {
    return(
      localStorage.getItem('role') === 'admin'
      ? <Component {...props} />
      : <Redirect to={{pathname: redir, state: { from: props.location}}} />
    )
    
  }} />
)

export default AdminPrivateRoute;
