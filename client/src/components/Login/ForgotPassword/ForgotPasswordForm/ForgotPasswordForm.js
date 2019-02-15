import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import './ForgotPasswordForm.scss';

 const renderInputField = (field) => {
   const className=`forgotPass__form-input ${field.meta.touched
    && field.meta.error
    ? 'has-error' : '' }`
    return(
      <FormControl className={className} margin="normal" required fullWidth>
        <InputLabel htmlFor={field.input.name} className='forgotPass__label'>{field.mylabel}</InputLabel>
        <Input 
        id={field.input.name} name={field.input.name} type={field.type} {...field.input} />
        <div className='forgotPass__error'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </FormControl>
    )
 }

 const ForgotPasswordForm = (props) => {
   const { handleSubmit } = props;
   let renderForm = (
     <form 
      onSubmit={handleSubmit}
      className='forgotPass__form'>
        <Field
          type='email'
          mylabel='Enter email'
          name='email'
          component={renderInputField}/>
        <div className='forgotPass__btnCont'>
          <Button
            className='forgotPass__btn'
            variant="contained" 
            color="primary"
            type='submit' >
            Send
          </Button> 
        </div>
     </form>
   )
  return (
    <div className='forgotPass'>
      {renderForm}
    </div>
  )
}
export default reduxForm({
  form: 'forgotPassword'
})(ForgotPasswordForm);