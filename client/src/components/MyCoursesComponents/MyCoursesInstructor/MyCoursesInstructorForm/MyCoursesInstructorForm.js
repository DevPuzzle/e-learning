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

const renderTextareaField = (field) => {
  const className = `instructor__form-input ${field.meta.touched
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
    </FormControl>
  )
}



class MyCoursesInstructorForm extends Component {

  state = {
    selectedCategoryEl: null,
    selectedSubcategoryEl: null,
    selectedThemeEl: null,
    openCategoriesList: false,
    openSubcategoriesList: false,
    openThemesList: false,
    subcategories: null,
    themes: null,
    selectedThemeItem: null,
    selectedImage: null,
    imagePreviewUrl: ''
    
  }

 

  openPopperHandler = e => {
    const { currentTarget } = e;
    this.setState(state => ({
      selectedCategoryEl: currentTarget,
      openSubcategoriesList: false,
      openThemesList: false,
      openCategoriesList: !state.openCategoriesList,
    }));
  }

  showSubcategoriesHandler = (e, id) => {
    const category = this.props.courseList.list.find(category => category._id === id);
    const { currentTarget } = e;
    this.setState(state => ({
      selectedSubcategoryEl: currentTarget,
      subcategories: null,
      openSubcategoriesList: false,
      openThemesList: false
      
    }))
    this.setState(state => ({
      selectedSubcategoryEl: currentTarget,
      openSubcategoriesList: true,
      subcategories: category.subcategory
    }))
    
  }

  showThemesHandler = (e, id) => {
    const subcategory = this.state.subcategories.find(subcategory => subcategory._id === id);
    const { currentTarget } = e;
    this.setState({
      openThemesList: true,
      selectedThemeEl: currentTarget,
      themes: subcategory.theme
    })
  }

  selectedThemeItem = (name) => {
    this.setState({
      selectedThemeItem: name,
      openCategoriesList: false,
      openSubcategoriesList: false,
      openThemesList: false
    })
  }

  selectImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    
    reader.onloadend = () => {
      this.setState({
      imagePreviewUrl: reader.result,
      selectedImage: file
      });
      
    }
    reader.readAsDataURL(file);
  }

  renderFileField = (field) => {
    return(
      <React.Fragment>
      <input style={{display: 'none'}} 
        type={field.type} 
        {...field.input} 
        name={field.name}
        onChange={this.selectImage}
        ref={fileInput => this.fileInput = fileInput}/>
      <Button 
        className='profile__changeImageBtn'
        variant="contained" 
        color="primary"
        onClick={() => this.fileInput.click()}>Choose image</Button>
   </React.Fragment>
    )
  }


  handleSubmit = (values) => {
    console.log(values, this.state.selectedImage)
  }

  render(){
    const { courseList, handleSubmit } = this.props;
    
    const { 
      selectedCategoryEl, 
      openCategoriesList, 
      openSubcategoriesList, 
      selectedSubcategoryEl,
      selectedThemeEl, 
      openThemesList,
      subcategories,
      themes } = this.state;  
      let $imagePreview = null;

      if(this.state.imagePreviewUrl){
        $imagePreview = (<img style={{width: '100%',
      height: '100%',
    objectFit: 'cover'}}src={this.state.imagePreviewUrl}/>); 
      }  

    let renderform = <form
    onSubmit={handleSubmit(this.handleSubmit)} 
    className='instructorForm'>    
     <div className='instructorForm__select'>
      <IconButton 
      className='instructorFrom__selectButton'
      onClick={this.openPopperHandler} >
        <i className="fas fa-th"></i>
      </IconButton>
     {this.state.selectedThemeItem ? 
      this.state.selectedThemeItem 
      : <h3>Select theme</h3> }
     </div>
      <Popper 
        placement='right-start' 
        style={{zIndex: '100000'}} 
        open={openCategoriesList} 
        anchorEl={selectedCategoryEl} 
        transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <List>
                  {courseList ? courseList.list.map(category => (
                    <React.Fragment key={category._id} >
                    <ListItem 
                      onMouseOver={(e) => this.showSubcategoriesHandler(e,category._id)}
                      button>
                        {category.name}
                    </ListItem>
                    </React.Fragment>
                  )) : null}
                  <PopperSubcategoriesList 
                    openSubcategoriesList={openSubcategoriesList}
                    selectedSubcategoryEl={selectedSubcategoryEl}
                    subcategories={subcategories}
                    showThemesHandler={this.showThemesHandler}
                    openThemesList={openThemesList}
                    selectedThemeEl={selectedThemeEl}
                    themes={themes}
                    selectedThemeItem={this.selectedThemeItem}/>
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
        className='instructor__right'
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
          {this.state.selectedImage ? 
          $imagePreview 
          : <h3 className='instructorForm__imageText'>
              Image will be here
            </h3>}
         
        </div>
        
      </div>
      <div className='instructor__btnCont'>
        <Button
          className='instructor__btn'
          variant="contained" 
          color="primary"
          type='submit'>
          Create
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