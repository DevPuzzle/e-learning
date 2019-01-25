import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';


export class ProfileChangePassword extends Component {

  renderInputField = (field) => {
    const className = `profile__form-input ${field.meta.touched 
      && field.meta.error 
      ? 'has-error' : ''}`

    return(
      <FormControl className={className} margin="normal" required fullWidth>
        <InputLabel htmlFor={field.name} >{field.label}</InputLabel>
        <Input id={field.name} name={field.name} type={field.type} {...field.input} />
        <div className='error'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </FormControl>
    )  

  }

  render(){
    const { handleSubmit } = this.props;
    let renderform = <form 
    onSubmit={handleSubmit} 
    className='profile__form'>
      <div className='profile__pass'>
      <Field 
        type='password'
        label='Previous password'
        name='password'
        component={this.renderInputField}/>
      <Field 
        type='password'
        label='New password'
        name='new_password'
        component={this.renderInputField}/>
      <Field 
        type='password'
        label='Confirm password'
        name='confirm_password'
        component={this.renderInputField}/>
      </div>
      <div className='login__btnCont'>
        <Button
        className='login__btn'
        variant="contained" 
        color="primary"
        type='submit' >
          Save
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
      <div className='profile__page'>
         {renderform}       
      </div>
    )
  }
}

function validate(values){

  const errors = {};
  
  if(!values.password){
    errors.password = 'The password is empty'
  }
  if(!values.new_password){
    errors.new_password = 'Enter new password'
  }
  if(!values.confirm_password){
    errors.confirm_password = 'The confirm is empty'
  }
  if(values.confirm_password !== values.new_password){
    errors.confirm_password = 'Passwords dont match!'
  }
  if(values.new_password && values.new_password.length < 4 ){
    errors.new_password = 'Passwords must be more than 4 symbols!'
  }
  
  return errors;
}

export default reduxForm({
  validate,
  form: 'profileChangePassword'
})(ProfileChangePassword);