import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './AdminEditForm.scss';


const renderInputField = (field) => {
  const className = `${field.meta.touched 
    && field.meta.error 
    ? 'has-error' : ''}`

  return(
    <div className={className + ' categoryEditForm__field'}>
      <input name={field.name} type={field.type} {...field.input}/>
      <div className='error'>
        {field.meta.touched ? field.meta.error : ''}
      </div>
    </div>
  )
}

const renderTextAreaField = (field) => {
  const className = `${field.meta.touched 
    && field.meta.error 
    ? 'has-error' : ''}`

  return(
    <div className={className + ' categoryEditForm__textarea'}>
      <textarea name={field.name} type={field.type} {...field.input}/>
      <div className='error'>
        {field.meta.touched ? field.meta.error : ''}
      </div>
    </div>
  )
}



const AdminCategoryEdit = (props) => {
 
    const { handleSubmit } = props;
    let renderform = <form className='categoryEditForm'
    onSubmit={handleSubmit}>
          <Field 
            type='text'
            name='name'
            component={renderInputField}/>
            <Field 
              type='text'
              name='description'
              component={renderTextAreaField}/>
         
            <button
            className='categoryEditForm__btn'
            variant="contained" 
            color="primary"
            type='submit' >
              Save
            </button>     
          </form>


    return(
      <div className='login__page'>
         {renderform}       
      </div>
    )
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
})(AdminCategoryEdit);