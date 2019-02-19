import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './ErrorComponent.scss';
import Button from '@material-ui/core/Button';

 class ErrorComponent extends Component {
  componentWillMount(){
    if(this.props.location.pathname !== '/errorPage'){
      this.props.history.push('/errorPage');
    }
  }

  redirectToHome = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <section className='errorComponent'>
        <div className='container errorComponent__container'>
          <div className='row errorComponent__row'>
            <div className='col-md-12 errorComponent__content'>
              <h1 className='errorComponent__title'>
                404
              </h1>
              <p className='errorComponent__subTitle'>
                Oops, sorry we can`t find this page!
              </p>
              <p className='errorComponent__text'>Either something went wrong or the page doesn`t exist anymore</p>
              <Button
                onClick={this.redirectToHome}
                className='errorComponent__btn'
                variant="contained" 
                color="primary">
                Home Page
              </Button> 
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(ErrorComponent);