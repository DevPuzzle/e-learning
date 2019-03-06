import React from 'react';
import './Footer.scss';
import logo from '../../assets/images/logo-white.png';

const Footer = () => {
  return(
    <footer className='footer'>
      <div className='container'>
        <div className='row justify-content-between align-items-center'>
          <div style={{width: '30px'}}>
            <img style={{width: '100%', height: '100%'}} src={logo} alt=""/>
          </div>
          <div>
          ©{new Date().getFullYear()} OwlUnion.com All rights reserved.
          </div>
          <div className='d-flex'>
            <p className='mr-5'>Terms of use</p>
            <p className='mr-5'>Privacy</p>
            <p>Site map</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;