import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import './SignUpForm.scss';
import { connect } from 'react-redux';/* 
import { signUp } from './actions/SignUpAction'; */
import Button from '@material-ui/core/Button';

class SignUpForm extends Component {
  
  renderInputField = (field) => {
    const className = `signUp__form-input ${field.meta.touched 
                                            && field.meta.error 
                                            ? 'has-error' : ''}`


    return(
      <div className={className}>
        <label className='signUp__form-label'>{field.mylabel}</label>
        <input className='signUp__input' type={field.type} {...field.input}/>
        <div className='error'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
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
          <div className='signUp__btnCont'>
            <Button
            className='home__btn'
            variant="contained" 
            color="primary"
            type='submit' >
              Add Knowledges
            </Button>     
          </div>
          
        </form>
      </div>
    )
  }
}

function validate(values){
  const errors = {};
  if(!values.name){
   errors.name = 'The name is empty'
  }
  if(!values.email){
    errors.email = 'The email is empty'
   }
   if(!values.password){
    errors.password = 'The password is empty'
   }

  return errors;
}

export default reduxForm({
  validate,
  form: 'SignUpForm'
})(SignUpForm);