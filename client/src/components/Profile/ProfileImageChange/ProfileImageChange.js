import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Spinner from '../../UI/Spinner/Spinner';


export class ProfileImageChange extends Component {
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

  renderFileField = (field) => {
    
    return(
      <React.Fragment>
      <input style={{display: 'none'}} 
        type={field.type} 
        {...field.input} 
        name={field.name}
        onChange={this.props.changes}
        ref={fileInput => this.fileInput = fileInput}/>
      <Button 
        className='profile__changeImageBtn'
        variant="contained" 
        color="primary"
        onClick={() => this.fileInput.click()}>Change image</Button>
   </React.Fragment>
    )

  }


  render(){
    const { handleSubmit } = this.props;
    let renderform = <form 
    onSubmit={handleSubmit} 
    className='profile__imageForm'>
      <div className='profile__pass'>
      <Field 
        type='file'
        name='imageload'
        component={this.renderFileField}/>
      </div>
      <div className='profile__changeImageBtnCont'>
      {this.props.profileError ? 
        <div className='login__userError'>Cant load image, try again</div> : null}
      {this.props.selectedImage ?
       <Button
       className='profile__changeImageSaveBtn'
       variant="contained" 
       color="primary"
       type='submit' >
         Save
       </Button>
       : null}
      </div>
    </form>





    return(
      <React.Fragment>
         {renderform}       
      </ React.Fragment>
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
  form: 'profileImageChange'
})(ProfileImageChange);