import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';


export class ProfileChangeData extends Component {

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
        type='text'
        label='First name'
        name='first_name'
        component={this.renderInputField}/>
      <Field 
        type='text'
        label='Last name'
        name='last_name'
        component={this.renderInputField}/>
      <Field 
        type='email'
        label='E-mail'
        name='email'
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
  
  if(!values.first_name){
    errors.first_name = 'Enter firstname'
  }
  if(!values.last_name){
    errors.last_name = 'Enter lastname'
  }
  if(!values.email){
    errors.email = 'Enter e-mail'
  }
  
  return errors;
}

export default reduxForm({
  validate,
  form: 'profileChangeData'
})(ProfileChangeData);