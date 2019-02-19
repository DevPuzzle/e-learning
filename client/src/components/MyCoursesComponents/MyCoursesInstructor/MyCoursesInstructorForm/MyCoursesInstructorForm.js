import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, FormControl, InputLabel, Input, Popper, IconButton, Paper, Typography, Fade } from '@material-ui/core';


const renderInputField = (field) => {
  const className = `instructor__form-input ${field.meta.touched 
  && field.meta.error 
  ? 'has-error' : ''}`
  return(
    <FormControl className={className} margin="normal" required fullWidth>
      <InputLabel htmlFor={field.name} className='instructor__label'>{field.label}</InputLabel>
      <Input id={field.input.name} className={field.input.name === 'first_name' || field.input.name === 'password' ? 'instructor__inp mr-4' : 'instructor__inp'} name={field.name} type={field.type} {...field.input} />
      <div className='instructor__error'>
        {field.meta.touched ? field.meta.error : ''}
      </div>
    </FormControl>
  )
} 

class MyCoursesInstructorForm extends Component {

  state = {
    anchorEl: null,
    open: false
  }

  handleClick = e => {
    const { currentTarget } = e;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  }

  render(){
    const { handleSubmit } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;
    let renderform = <form
    onSubmit={handleSubmit} 
    className='instructorForm'>    
      <IconButton onClick={this.handleClick} aria-describedby={id}>
        <i className="fas fa-th"></i>
      </IconButton>
      <Popper id={id} style={{zIndex: '100000'}} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography>The content of the Popper.</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      <Field 
            type='text'
            label='First name'
            name='first_name'
            component={renderInputField}/>
      <Field 
            className='instructor__right'
            type='text'
            label='Last name'
            name='last_name'
            component={renderInputField}/>
      <div className='instructor__btnCont'>
        <Button
        className='instructor__btn'
        variant="contained" 
        color="primary"
        type='submit' >
          Sign Up
        </Button>     
      </div>
      </form>
  
    return (
     <React.Fragment>
       {renderform}
     </React.Fragment>
     
    )
  }
  }
 

export default reduxForm({
  form: 'createInstructor'
})(MyCoursesInstructorForm);