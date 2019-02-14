import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import '../Login.scss';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';


class LoginForm extends Component {
  
  renderInputField = (field) => {
    const className = `login__form-input ${field.meta.touched 
      && field.meta.error 
      ? 'has-error' : ''}`

    return(
      <FormControl className={className} margin="normal" required fullWidth>
        <InputLabel htmlFor={field.name} className='login__label'>{field.mylabel}</InputLabel>
        <Input id={field.name} name={field.name} type={field.type} {...field.input} />
        <div className='login__error'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </FormControl>
    )
  }

 
  

  render(){
    const { handleSubmit } = this.props;
    let renderform = <form 
    onSubmit={handleSubmit} 
    className='login__form'>
      {this.props.userError ? 
        <div className='login__userError'>Wrong data, try again</div> : null}
          <Field 
            type='email'
            mylabel='Enter email'
            name='email'
            component={this.renderInputField}/>
          <Field 
            type='password'
            mylabel='Enter password'
            name='password'
            component={this.renderInputField}/>
          <div className='login__forgot' onClick={this.props.openModal}>Forgot password?</div>
          <div className='login__btnCont'>
            <Button
            className='login__btn'
            variant="contained" 
            color="primary"
            type='submit' >
              LogIn
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
    errors.email = 'Empty email'
   }
   if(!values.password ){
    errors.password = 'Empty password'
   }

  return errors;
}

export default reduxForm({
  validate,
  form: 'loginForm'
})(LoginForm);