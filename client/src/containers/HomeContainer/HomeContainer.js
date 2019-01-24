import React, { Component } from 'react'
import './HomeContainer.scss';
import Login from '../../components/Login/Login';
import { Route, NavLink, Switch } from 'react-router-dom';
import Info from '../../components/Info/Info';

const Contact = () => <div>You're on the Contact Tab</div>;






 class HomeContainer extends Component {



  render() {


    return (
      <section className='home'>       
        <div className='home__banner'>

        <div className='wrapper'>   
          <div className='home__content'>
          <h1 className='home__title'>
            You can learn anything
          </h1> 
          <h3 className='home__subTitle'>
            For free. For everyone. Forever
          </h3>
          <div className='home__tabs'>
          <NavLink activeClassName='home__active' to={'/'}><i className="fas fa-info"></i></NavLink>
          <NavLink to={'/home/login'}><i className="fas fa-lock"></i></NavLink>
          <NavLink to={'/home/contact'}><i className="fas fa-user-plus"></i></NavLink>
          </div>
          <div className="home__tab">
            <Switch>
              <Route path={`/home`} exact component={Info} />
              <Route path={`/home/login`} component={Login} />
              <Route path={`/home/contact`} component={Contact} />
            </Switch>
          </div>
         
          </div>
          </div>          
        </div>
      </section>
    )
  }
}

export default HomeContainer;