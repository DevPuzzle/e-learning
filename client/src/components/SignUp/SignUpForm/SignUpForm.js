import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import './SignUpForm.scss';

class SignUpForm extends Component {
  
  renderInputField = (field) => {
    return(
      <div className='signUp__form-input'>
        <label className='signUp__form-label'>{field.mylabel}</label>
        <input className='signUp__input' type={field.type} {...field}/>
      </div>
    )
  }

  render(){
    return(
      <div className='signUp'>
        <form className='signUp__form'>
          <Field 
            type='text'
            mylabel='Enter your username'
            name='name'
            component={this.renderInputField}/>
          <Field 
            type='email'
            mylabel='Enter your email'
            name='email'
            component={this.renderInputField}/>
          <Field 
            type='password'
            mylabel='Enter your password'
            name='password'
            component={this.renderInputField}/>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'SignUpForm'
})(SignUpForm);