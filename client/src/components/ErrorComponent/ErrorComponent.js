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
    this.props.history.push('/home')
  }

  render() {
    return (
      <section className='error'>
        <div className='container error__container'>
          <div className='row error__row'>
            <div className='col-md-12 error__content'>
              <h1 className='error__title'>
                404
              </h1>
              <p className='error__subTitle'>
                Oops, sorry we can`t find this page!
              </p>
              <p className='error__text'>Either something went wrong or the page doesn`t exist anymore</p>
              <Button
                onClick={this.redirectToHome}
                className='error__btn'
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