import React from 'react'
import './VerifySuccess.scss';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
const VerifySuccess = () => {
  
  return (
    <section className='verifySuccess'>
        <div className='container verifySuccess__container'>
          <div className='row verifySuccess__row'>
            <div className='col-md-12 verifySuccess__content'>
              <p className='verifySuccess__text'>
                Your account successfully verified, please login
              </p>
              <Button 
                component={Link}
                to='/login'
                className='verifySuccess__btn'
                variant="contained">
                To Login
                </Button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default VerifySuccess;