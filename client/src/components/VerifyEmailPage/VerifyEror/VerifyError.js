import React from 'react'
import './VerifyError.scss';

const VerifyError = () => {
  return (
    <section className='verifyError'>
        <div className='container verifyError__container'>
          <div className='row verifyError__row'>
            <div className='col-md-12 verifyError__content'>
              <p className='verifyError__text'>
                Something went wrong
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default VerifyError;