import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { 
  Button, 
  FormControl, 
  InputLabel, 
  Input, 
  Popper,
  List, 
  ListItem, 
  IconButton, 
  Paper,
  TextField,
  Fade } from '@material-ui/core';
import './MyCoursesInstructorForm.scss';
import PopperSubcategoriesList from './PopperSubcategoriesList/PopperSubcategoriesList';

const renderInputField = (field) => {
  const className = `instructorForm__form-input ${field.meta.touched 
  && field.meta.error 
  ? 'has-error' : ''}`
  return(
    <FormControl className={className} margin="normal" required fullWidth>
      <InputLabel htmlFor={field.name} className='instructorForm__label'>{field.label}</InputLabel>
      <Input id={field.input.name} className={field.input.name === 'first_name' || field.input.name === 'password' ? 'instructor__inp mr-4' : 'instructor__inp'} name={field.name} type={field.type} {...field.input} />
      <div className='instructorForm__error'>
        {field.meta.touched ? field.meta.error : ''}
      </div>
    </FormControl>
  )
}

const renderTextareaField = (field) => {
  const className = `instructorForm__form-input ${field.meta.touched
  && field.meta.error 
  ? 'has-error' : ''}` 
  return (
    <FormControl className={className} margin="normal" required fullWidth>
      <TextField
        {...field.input}
        name={field.name} 
        type={field.type}
        label='Description'
        placeholder="Enter your description here"
        multiline={true}
        rows={3}
        />
         <div className='instructorForm__error'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
    </FormControl>
  )
}


class MyCoursesInstructorForm extends Component {

  renderFileField = (field) => {
    const className = `instructorForm__form-input ${field.meta.touched
      && field.meta.error 
      ? 'has-error' : ''}`;
    return(
      <FormControl className={className} margin="normal" required fullWidth>
      <input style={{display: 'none'}} 
        type={field.type} 
        {...field.input}
        value=''
        name={field.name}
        onChange={this.props.selectImage}
        ref={fileInput => this.fileInput = fileInput}/>
      <Button 
        className='instructorForm__changeImageBtn'
        variant="contained" 
        color="primary"
        onClick={() => this.fileInput.click()}>Choose image</Button>
        <div className='instructorForm__error'>
        {field.meta.touched ? field.meta.error : ''}
      </div>
   </FormControl>
    )
  }

  render(){
 
    const { courseList, 
            handleSubmit,
            selectedCategoryEl, 
            openCategoriesList, 
            openSubcategoriesList, 
            selectedSubcategoryEl,
            selectedThemeEl, 
            openThemesList,
            subcategories,
            themes, 
            chosenCategoryName,
            chosenSubcategoryName,
            pristine } = this.props;
    
      const checkTheme = (selectedTheme, apiTheme) => {
        if(selectedTheme){
          return <h3>{`${chosenCategoryName} > ${chosenSubcategoryName} > ${selectedTheme.name}`}</h3>
        }else if(apiTheme){
          return <h3>{`${apiTheme.theme.subcategory.name} > ${apiTheme.theme.subcategory.category.name} > ${apiTheme.theme.name}`}</h3>
        }else{
          return <h3>Select theme</h3>
        }
      }

      const checkImage = (selectedImage, apiImage) => {
        if(selectedImage){
          return <img src={this.props.imagePreviewUrl}/>
        }else if(apiImage){
          return <img src={`http://localhost:5000/${apiImage.image}`} />
        }else{
          return <h3 className='instructorForm__imageText'>
              Image will be here
            </h3>
        }
      }
    let renderform = <form
    onSubmit={handleSubmit} 
    className='instructorForm'>    
     <div className='instructorForm__select'>
      <IconButton 
      className='instructorFrom__selectButton'
      onClick={this.props.openPopperHandler} >
        <i className="fas fa-th"></i>
      </IconButton>
      {checkTheme(this.props.selectedThemeItem, this.props.editedCover)}
     </div>
      <Popper 
        placement='right-start' 
        style={{zIndex: '100000'}} 
        open={openCategoriesList} 
        anchorEl={selectedCategoryEl} 
        onMouseLeave={this.props.leaveMouseHandler}
        transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <List>
                  {courseList ? courseList.list.map(category => (
                    <React.Fragment key={category._id} >
                    <ListItem 
                      onMouseOver={(e) => this.props.showSubcategoriesHandler(e,category._id, category.name)}
                      button>
                        {category.name}
                    </ListItem>
                    </React.Fragment>
                  )) : null}
                  <PopperSubcategoriesList 
                    openSubcategoriesList={openSubcategoriesList}
                    selectedSubcategoryEl={selectedSubcategoryEl}
                    subcategories={subcategories}
                    showThemesHandler={this.props.showThemesHandler}
                    openThemesList={openThemesList}
                    selectedThemeEl={selectedThemeEl}
                    themes={themes}
                    selectedThemeItemHandler={this.props.selectedThemeItemHandler}/>
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
      <Field 
        type='text'
        label='Title'
        name='name'
        component={renderInputField}/>
      <Field 
        className='instructorForm__right'
        type='text'
        label='Information'
        name='info'
        component={renderInputField}/>
      <Field
        type='text'
        name='description'
        component={renderTextareaField}/>
      <div className='instructorForm__image' style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <Field 
        type='file'
        name='image'
        component={this.renderFileField}/>
        <div className='instructorForm__imageCont'>
          {checkImage(this.props.selectedImage, this.props.editedCover)}
        </div>
      </div>
      <div className='instructorForm__btnCont'>
        <Button
          className='instructorForm__btn'
          variant="contained" 
          color="primary"
          type='submit'
          disabled={this.props.editedCover ? null : !this.props.selectedThemeItem || !this.props.selectedImage}>
            Save
        </Button>
        <Button onClick={this.props.closeCreateInstructor ? this.props.closeCreateInstructor : this.props.closeEditor} className='instructorForm__cancelButton' color="primary">
              Cancel
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

const validate = (values) => {
  const errors = {};
  if(!values.name){
    errors.name = 'Required field'
  }
  if(!values.info){
    errors.info = 'Required field'
  }
  if(!values.description){
    errors.description = 'Required field'
  }
  return errors;
} 

export default reduxForm({
  validate
})(MyCoursesInstructorForm);