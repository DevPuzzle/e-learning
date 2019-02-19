import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, FormControl, InputLabel, Input, Popper,List, ListItem, IconButton, Paper, Typography, Fade } from '@material-ui/core';


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
    open: false,
    anchorEl2: null,
    opensub: false,
    subcategories: null,
    themes: null,
    opentheme: false,
    anchorEl3: null
  }

  handleClick = e => {
    const { currentTarget } = e;
    this.setState(state => ({
      anchorEl: currentTarget,
      opensub: false,
      open: !state.open,
    }));
  }

  handleOver = (e, id) => {
    const category = this.props.courseList.list.find(category => category._id === id);
  
    const { currentTarget } = e;
    this.setState(state => ({
      anchorEl2: currentTarget,
      subcategories: null,
      opensub: false,
      opentheme: false
      
    }))
    this.setState(state => ({
      anchorEl2: currentTarget,
      opensub: true,
      subcategories: category.subcategory
    }))
    
  }

  handleOverThemes = (e, id) => {
    const subcategory = this.state.subcategories.find(subcategory => subcategory._id === id);
    const { currentTarget } = e;
    this.setState({
      opentheme: true,
      anchorEl3: currentTarget,
      themes: subcategory.theme
    })
  }

  render(){
    const { handleSubmit, courseList } = this.props;
    const { anchorEl, open, opensub, anchorEl2,anchorEl3, opentheme } = this.state;    
    let renderform = <form
    onSubmit={handleSubmit} 
    className='instructorForm'>    
      <IconButton onClick={this.handleClick} >
        <i className="fas fa-th"></i>
      </IconButton>
      <Popper 
        placement='right-start' 
        style={{zIndex: '100000'}} 
        open={open} 
        anchorEl={anchorEl} 
        transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <List>
                  {this.props.courseList ? this.props.courseList.list.map(category => (
                    
                    <React.Fragment key={category._id} >
                    <ListItem 
                      onMouseOver={(e) => this.handleOver(e,category._id)}
                      button 
                      /* id={category._id} */>
                      {category.name}
                    </ListItem>
                    </React.Fragment>
                  )) : null}
                  <Popper
                    placement='right-start'
                    style={{zIndex: '100100'}}
                    open={opensub}
                    anchorEl={anchorEl2}
                    transition>
                      {({TransitionProps}) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper>
                            <List>
                              {this.state.subcategories.map(subcategory => (
                                <ListItem 
                                  onMouseOver={(e) => this.handleOverThemes(e, subcategory._id)}
                                  key={subcategory._id}
                                  button>
                                  {subcategory.name}
                                </ListItem>
                              ))}
                              <Popper
                                placement='right-start'
                                style={{zIndex: '100200'}}
                                open={opentheme}
                                anchorEl={anchorEl3}
                                transition>
                                {({TransitionProps}) => (
                                  <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                      <List>
                                        {this.state.themes.map(theme => (
                                          <ListItem
                                            key={theme._id}>
                                              {theme.name}
                                          </ListItem>
                                        ))}
                                      </List>
                                    </Paper>
                                  </Fade>
                                )}
                              </Popper>
                              
                            </List>
                          </Paper>
                        </Fade>
                      )}
                  </Popper>
                </List>
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