import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import './SignUpForm.scss';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

class SignUpForm extends Component {
  


  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  renderInputField = (field) => {
    const className = `signUp__form-input ${field.meta.touched 
    && field.meta.error 
    ? 'has-error' : ''}`
    return(
      <FormControl className={className} margin="normal" required fullWidth>
        <InputLabel htmlFor={field.name} className='signUp__label'>{field.label}</InputLabel>
        <Input id={field.input.name} className={field.input.name === 'first_name' || field.input.name === 'password' ? 'signUp__inp mr-4' : 'signUp__inp'} name={field.name} type={field.type} {...field.input} />
        <div className='signUp__error'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </FormControl>
    )
  } 

  renderSelectField = (field) => {
    const className = `signUp__form-input status ${field.meta.touched
    && field.meta.error
    ? 'has-error' : ''}` 
    return(
      <FormControl className={className}>
      <InputLabel htmlFor={field.name} className='signUp__label'>Role</InputLabel>
      <Select        
        native
        onChange={this.handleChange('role')}
        inputProps={{
          name: field.name,
          id: field.name,
        }}
      {...field.input}
      >
      <option value='' />
      <option value={'student'}>Student</option>
      <option value={'teacher'}>Teacher</option>
      </Select>
      <div className='signUp__error'>
        {field.meta.touched ? field.meta.error : ''}
      </div>
    </FormControl>
    )

  }
  

  render(){
    const { handleSubmit } = this.props;
    let renderform = <form
    onSubmit={handleSubmit} 
    className='signUp__form'>    
    {this.props.userError ? 
        <div className='login__userError'>Connection error, try again later</div> : null}
      <div className='signUp__name'>
      <Field 
            type='text'
            label='First name'
            name='first_name'
            component={this.renderInputField}/>
      <Field 
            className='signUp__right'
            type='text'
            label='Last name'
            name='last_name'
            component={this.renderInputField}/>
      </div>
      <Field 
        type='text'
        label='Enter username'
        name='name'
        component={this.renderInputField}/>
      <Field 
        type='email'
        label='Enter email'
        name='email'
        component={this.renderInputField}/>
      <div className='signUp__pass'>
      <Field 
        type='password'
        label='Enter password'
        name='password'
        component={this.renderInputField}/>
      <Field 
        type='password'
        label='Confirm password'
        name='confirm_password'
        component={this.renderInputField}/>
      </div>
      <div className='signUp__select'>
        <Field
          name='role'
          component={this.renderSelectField} />
      </div>
      <div className='signUp__btnCont'>
        <Button
        className='signUp__btn'
        variant="contained" 
        color="primary"
        type='submit' >
          Sign Up
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
  if(!values.first_name){
    errors.first_name = 'Empty firstname'
  }
  if(!values.last_name){
    errors.last_name = 'Empty lastname'
  }
  if(!values.name){
   errors.name = 'Empty name'
  }
  if(!values.email){
    errors.email = 'Empty email'
  }
  if(!values.password){
    errors.password = 'Empty password'
  }
  if(!values.confirm_password){
    errors.confirm_password = 'Empty confirm'
  }
  if(values.confirm_password !== values.password){
    errors.confirm_password = 'Passwords dont match!'
  }
  if(values.password && values.password.length < 6 ){
    errors.password = 'Passwords must at least 6 symbols!'
  }
  if(!values.role){
    errors.role = 'Select role'
  }
  
  return errors;
}

export default reduxForm({
  validate,
  form: 'SignUpForm'
})(SignUpForm);