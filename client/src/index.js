import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Routes from './routes/routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { BrowserRouter, Route } from 'react-router-dom';
import AdminRoutes from './routes/adminroutes';

const composeEnhancers =  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)));

  

const App = () => {

  return(
    <Provider store={store}> 
      <BrowserRouter>
        <React.Fragment>
          <AdminRoutes />
          <Routes />
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  )
}



ReactDOM.render(<App />, document.getElementById('root'));


