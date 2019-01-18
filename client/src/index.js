import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Routes from './routes/routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { BrowserRouter} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const composeEnhancers =  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)));


const App = () => {

  return(
    <Provider store={store}> 
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Routes />
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  )
}



ReactDOM.render(<App />, document.getElementById('root'));

