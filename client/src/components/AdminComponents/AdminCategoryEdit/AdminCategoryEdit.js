import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import './AdminCategoryEdit.scss';

class AdminCategoryEdit extends Component {
  
  renderInputField = (field) => {
    console.log('FILED', field)
    const className = `${field.meta.touched 
      && field.meta.error 
      ? 'has-error' : ''}`

    return(
      <div className={className}>
        <input name={field.name} type={field.type} {...field.input} autoFocus/>
        <div className='error'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

 
  

  render(){
    
    const { handleSubmit } = this.props;
    let renderform = <form className='categoryEditForm'
    onSubmit={handleSubmit}>
          <Field 
            type='text'
            name='name'
            component={this.renderInputField}/>
          <div >
            <button
            className='categoryEditForm__btn'
            variant="contained" 
            color="primary"
            type='submit' >
              edit
            </button>     
          </div>
          </form>


    return(
      <div className='login__page'>
         {renderform}       
      </div>
    )
  }
}

/* function validate(values){
  const errors = {};
  
  if(!values.email){
    errors.email = 'The email is empty'
   }
   if(!values.password){
    errors.password = 'The password is empty'
   }

  return errors;
} */

export default reduxForm({
  /* validate, */
  form: 'editCategory'
})(AdminCategoryEdit);