import React from 'react';
import './Footer.scss';
// import logo from '../../assets/images/logo-white.png';

const Footer = () => {
  return(
    <footer className='footer'>
      <div className='container'>
        <div className='row justify-content-center'>
          {/* <div style={{width: '30px'}}>
            <img style={{width: '100%', height: '100%'}} src={logo} alt=""/>
          </div> */}
          <div style={{display: 'flex',flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
            <div style={{ marginBottom: '10px', alignItems: 'center' }}>
              ©{new Date().getFullYear()} OwlUnion.com All rights reserved.
            </div> 
            <p style={{ fontSize: '12px' }}>Made by <span style={{  fontWeight: 'bold' }}>DevPuzzle</span></p>   
          </div>
        </div>        
      </div>
    </footer>
  )
}

export default Footer;