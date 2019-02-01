import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

 class AdminLoginForm extends Component {

  renderInputField = (field) => {
    const className = `adminLogin__form-input ${field.meta.touched 
      && field.meta.error 
      ? 'has-error' : ''}`
      return(
        <div className={className}>
          <input name={field.name} type={field.type} {...field.input} placeholder={field.placeholder}/>
          <div className='adminLogin__error'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
        </div>
      )
    }

  render() {
    const { handleSubmit } = this.props;
    let renderForm = <form
      onSubmit={handleSubmit}
      className='adminLogin__form'>
      <Field 
        type='email'
        name='email'
        component={this.renderInputField}
        placeholder='Email'/>
        <Field 
        type='password'
        name='password'
        component={this.renderInputField}
        placeholder='Password'/>
        <div className='adminLogin__btn'>
          <button>
            Login
          </button>
        </div>
    </form>
    return (
      <div className='adminLogin__page'>
        
        {renderForm}
        <div className='adminLogin__blur'></div>
      </div>
    )
  }
}

function validate(values){
  const errors = {};
  
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
  form: 'adminLoginForm',
})(AdminLoginForm);