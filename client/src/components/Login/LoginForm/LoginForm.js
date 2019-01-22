import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import '../Login.scss';

class LoginForm extends Component {
  
  renderInputField = (field) => {
    const className = `login__form-input ${field.meta.touched 
    && field.meta.error 
    ? 'has-error' : ''}`


    return(
      <div className={className}>
        <label className='login__form-label'>{field.mylabel}</label>
        <input className='login__input' type={field.type} {...field.input}/>
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
    className='login__form'>
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
          <div className='login__btnCont'>
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
      <div className='login__page'>
         {renderform}       
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
  form: 'LoginForm'
})(LoginForm);