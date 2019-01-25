import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import default_avatar from '../../../assets/images/default-avatar.png';


export class ProfileForm extends Component {

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
    console.log('DATA PROFILE',this.props)
    const { handleSubmit } = this.props;
    let renderform = <form 
    onSubmit={handleSubmit} 
    className='profile__form'>
      <Field 
        type='first_name'
        label='First name'
        name='first_name'
        component={this.renderInputField}/>
      <Field 
        type='last_name'
        label='Last name'
        name='last_name'
        component={this.renderInputField}/>
      <Field 
        type='email'
        label='Enter your email'
        name='email'
        component={this.renderInputField}/>
      <div className='profile__pass'>
      <Field 
        type='password'
        label='Password'
        name='password'
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
        <div className='profile__avatar'>
          <img src={default_avatar} alt="Avatar"/>
        </div>
         {renderform}       
      </div>
    )
  }
}

function validate(values){

  const errors = {};
  if(!values.first_name){
    errors.first_name = 'The firstname is empty'
  }
  if(!values.last_name){
    errors.last_name = 'The lastname is empty'
  }
  if(!values.name){
   errors.name = 'The name is empty'
  }
  if(!values.email){
    errors.email = 'The email is empty'
  }
  if(!values.password){
    errors.password = 'The password is empty'
  }
  if(!values.confirm_password){
    errors.confirm_password = 'The confirm is empty'
  }
  if(values.confirm_password !== values.password){
    errors.confirm_password = 'Passwords dont match!'
  }
  if(values.password && values.password.length < 4 ){
    errors.password = 'Passwords must be more than 4 symbols!'
  }
  
  return errors;
}

export default reduxForm({
  validate,
  form: 'profileForm'
})(ProfileForm);