import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import './SignUpForm.scss';
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
    const { handleSubmit } = this.props;
    let renderform = <form
    onSubmit={handleSubmit} 
    className='signUp__form'>
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


    if(this.props.loading){
      renderform = <div className="spinner">
      <div className="cube1"></div>
      <div className="cube2"></div>
    </div>
    }

    return(
      <div className='signUp'>
         {renderform}       
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