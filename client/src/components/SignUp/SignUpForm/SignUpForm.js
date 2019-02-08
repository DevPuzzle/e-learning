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
    console.log(name)
    this.setState({ [name]: event.target.value });
  };

  renderInputField = (field) => {
    const className = `signUp__form-input ${field.meta.touched 
    && field.meta.error 
    ? 'has-error' : ''}`

    return(
      <FormControl className={className} margin="normal" required fullWidth>
        <InputLabel htmlFor={field.name} >{field.label}</InputLabel>
        <Input id={field.name} className="signUp__inp" name={field.name} type={field.type} {...field.input} />
        <div className='error'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </FormControl>
    )
  } 

  renderSelectField = (field) => {
    const className = `signUp__form-input ${field.meta.touched
    && field.meta.error
    ? 'has-error' : ''}` 
    return(
      <FormControl className={className}>
      <InputLabel htmlFor={field.name}>Status</InputLabel>
      <Select        
        native
        onChange={this.handleChange('status')}
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
    </FormControl>
    )

  }
  

  render(){
    const { handleSubmit } = this.props;
    let renderform = <form
    onSubmit={handleSubmit} 
    className='signUp__form'>
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
        label='Enter your username'
        name='name'
        component={this.renderInputField}/>
      <Field 
        type='email'
        label='Enter your email'
        name='email'
        component={this.renderInputField}/>
      <div className='signUp__pass'>
      <Field 
        type='password'
        label='Enter your password'
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
          name='status'
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
  form: 'SignUpForm'
})(SignUpForm);