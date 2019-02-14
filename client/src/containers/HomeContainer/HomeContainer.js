import React, { Component } from 'react'
import './HomeContainer.scss';
import Login from '../../components/Login/Login';
import { Route, NavLink, Switch } from 'react-router-dom';
import Info from '../../components/Info/Info';
import SignUp from '../../components/SignUp/SignUp';
import { connect } from 'react-redux';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

class HomeContainer extends Component {

  render() {
    return (
      <section className='home'>       
        <div className='home__banner'>
          <div className='container'>   
            <div className='home__content row align-items-center'>
              <div 
                className='col-md-6' 
                style={{
                    top: '-70px'
                }}>
                <h1 className='home__title'>
                  You can learn anything
                </h1> 
                <h3 className='home__subTitle'>
                  For free. For everyone. Forever
                </h3>
                <div className='home__tabs'>
                <NavLink activeClassName='home__active' exact to={'/'}><i className="fas fa-info"></i></NavLink>
                {this.props.login && !this.props.login.token ? 
                
                <React.Fragment>
                  <NavLink activeClassName='home__active' to={'/login'}><i className="fas fa-lock"></i></NavLink>
                  <NavLink activeClassName='home__active' to={'/signup'}><i className="fas fa-user-plus"></i></NavLink>
                </React.Fragment>
                :null}
                </div>
                <div className="home__tab">
                  <Switch>              
                    <Route path={`/signup`} exact component={SignUp} />
                    <Route path={`/login`} exact component={Login} />
                    <Route path={`/`} exact component={Info} />
                    <Route component={ErrorComponent} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>          
        </div>
        <div style={{padding: '40px'}}>
          CONTENT HERE
        </div>
      </section>
    )
  }
}
const mapStateToProps = (state) => {
  
  return {
    login: state.login
  }
}


export default connect(mapStateToProps)(HomeContainer);