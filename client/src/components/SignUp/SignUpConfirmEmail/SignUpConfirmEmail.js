import React, { Component } from 'react';
import imageEmail from '../../../assets/images/email.png';
import './SignUpConfirmEmail.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class SignUpConfirmEmail extends Component {


  componentWillMount(){
    if(this.props.email === null){
      this.props.history.push('/login');
    }
  }

  render() {
    
  return (
    <section className='confirmEmail'>
      <div className='container confirmEmail__container'>
        <div className='row confirmEmail__row'>
          <div className='col-md-12 confirmEmail__content'>
            <p className='confirmEmail__text'>
              Check your inbox to verify your email.                                    
            </p>
            <p className='confirmEmail__secondtext'>
              We've sent an email to <a className='confirmEmail__link' target="_blank" href={`http://${this.props.email}`}>{this.props.email}</a> 
            </p>
            <img className='confirmEmail__image' src={imageEmail} />
            <p className='confirmEmail__subtext'>Follow the instructions to verify your email address.</p>
          </div>
        </div>
      </div>
    </section>
  )
  }
  
}

const mapStateToProps = state => {
  return{
    email: state.signup.email
  }
}

export default connect(mapStateToProps)(withRouter(SignUpConfirmEmail));