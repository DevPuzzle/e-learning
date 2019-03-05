import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { 
  Button, 
  FormControl, 
  InputLabel, 
  Input,
  TextField,
  Paper,
  MenuItem} from '@material-ui/core';
 import Typehead from '../../../UI/Templates/Typehead/Typehead';


  const renderInputField = (field) => {
    const className = `instructorForm__form-input ${field.meta.touched 
      && field.meta.error 
      ? 'has-error' : ''}`
      return(
        <FormControl className={className} margin="normal" required fullWidth>
          <InputLabel htmlFor={field.name} className='instructorForm__label'>{field.label}</InputLabel>
          <Input id={field.input.name} className='instructor__inp' name={field.name} type={field.type} {...field.input}/>
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
  

  class MySchoolInstructorForm extends Component {
    
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
          ref={field.input.name === 'logo' ? fileInput => this.fileInput = fileInput
        : backgroundInput => this.backgroundInput = backgroundInput}/>
        <Button 
          className='instructorForm__changeImageBtn'
          variant="contained" 
          color="primary"
          onClick={() => field.input.name === 'logo' ? this.fileInput.click() : this.backgroundInput.click()}>Choose image</Button>
          <div className='instructorForm__error'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
     </FormControl>
      )
    }

    render(){
      const { handleSubmit } = this.props;
      const checkBackgroundImage = (selectedBackgroundImage, toShow) => {
        if(selectedBackgroundImage){
          return <img src={toShow}/>
        }else{
          return <h3 className='instructorForm__imageText'>
              Image will be here
            </h3>
        }
      }

      let renderform = <form
        style={{width: '400px'}}
        onSubmit={handleSubmit}
        className='instructorForm'>
        <Field 
          type='text'
          label='Name'
          name='name'
          component={renderInputField}/>{/* 
          <div className='instructorForm__address'> */} 
         <Typehead
          selectedCity={this.props.selectedCity}
          downshiftOnChange={this.props.downshiftOnChange}
          inputChange={this.props.inputChange}
          cities={this.props.cities}
          citiesData={this.props.citiesData} 
          getSuggestions={this.props.getSuggestions}/>
          
         {/* </div> */} 
        <Field 
          type='text'
          name='address'
          label='Street'
          component={renderInputField}/>
        <Field 
          type='text'
          name='info'
          component={renderTextareaField}/>
        <div className='instructorForm__image' style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <h3>Background image</h3>
          <Field 
            type='file'
            name='image'
            component={this.renderFileField}
            onChange={this.props.selectBackgroundImageHandler}/>
          <div className='instructorForm__imageCont'>
            {checkBackgroundImage(this.props.selectedBackgroundImage, this.props.backgroundImagePreviewUrl)}
          </div>
        </div>
        <div className='instructorForm__image' style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <h3>Logo image</h3>
          <Field 
            type='file'
            name='logo'
            component={this.renderFileField}
            onChange={this.props.selectLogoHandler}/>
          <div className='instructorForm__imageCont'>
            {checkBackgroundImage(this.props.selectedLogo, this.props.logoImagePreviewUrl)}
          </div>
        </div>
          
        <div className='instructorForm__btnCont'>
        <Button
          className='instructorForm__btn'
          variant="contained" 
          color="primary"
          type='submit'
          /* disabled={this.props.editedCover ? null : !this.props.selectedThemeItem || !this.props.selectedImage} */>
            Save
        </Button>
        <Button /* onClick={this.props.closeCreateInstructor ? this.props.closeCreateInstructor : this.props.closeEditor} */ className='instructorForm__cancelButton' color="primary">
              Cancel
        </Button>
      </div>
      </form>

      return(
        <React.Fragment>
          {renderform}
        </React.Fragment>
      )
    }
  }

  export default reduxForm({
    
  })(MySchoolInstructorForm);