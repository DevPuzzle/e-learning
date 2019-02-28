import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Dialog, DialogContent, DialogTitle, Button, DialogActions, DialogContentText } from '@material-ui/core';
import MyCoursesInstructorForm from './MyCoursesInstructorForm/MyCoursesInstructorForm';
import { connect } from 'react-redux';
import * as action from '../../../actions/courseCoverActions';
import * as actionCourse from '../../../actions/courseListActions';
import Spinner from '../../UI/Spinner/Spinner';
import CourseCover from './CourseCover/CourseCover';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    background: '#0277bd',
    color: '#fff',
    '&:hover': {
      background: '#039be5'
    }
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
    card: {
      maxWidth: 345,
      height: '100%'
    },
    media: {
      height: 140,
    }
});

class MyCoursesInstructor extends Component{
  state = {
    showCreateInstructor: false,
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
    imagePreviewUrl: '',
    editeTheme: null,
    showEditor: false,
    editedCover: null,
    confirmDialog: false,
    courseElToDelete: null,
    chosenCategoryName: null,
    chosenSubcategoryName: null,
    selectedChosenCategory: null,
    selectedChosenSubcategory: null
  }
  
  componentDidMount(){
    this.props.onGetCourseCovers();
  }

  openCreateInstrucor = () => {
    this.props.onGetCourseList();
    this.setState({
      showCreateInstructor: true
    })
  }

  closeCreateInstructor = () => {
    this.setState({
      showCreateInstructor: false,
      selectedImage: null,
      selectedThemeItem: null,
      openCategoriesList: false
      
    })
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

  showSubcategoriesHandler = (e, id, name) => {
    const category = this.props.courseList.list.find(category => category._id === id);
    const { currentTarget } = e;

    this.setState({
      selectedSubcategoryEl: currentTarget,
      subcategories: null,
      openSubcategoriesList: false,
      openThemesList: false,
      chosenCategoryName: name

      
    })
    this.setState({
      selectedSubcategoryEl: currentTarget,
      openSubcategoriesList: true,
      subcategories: category.subcategory
    })
  }

  showThemesHandler = (e, id, name) => {
    const subcategory = this.state.subcategories.find(subcategory => subcategory._id === id);
    const { currentTarget } = e;
    this.setState({
      openThemesList: true,
      selectedThemeEl: currentTarget,
      themes: subcategory.theme,
      chosenSubcategoryName: name

    })
  }

  selectedThemeItemHandler = (theme) => {
    this.setState({
      selectedThemeItem: theme,
      openCategoriesList: false,
      openSubcategoriesList: false,
      openThemesList: false,
      selectedChosenCategory: this.state.chosenCategoryName,
      selectedChosenSubcategory: this.state.chosenSubcategoryName
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
    if(e.target.files[0]){
      reader.readAsDataURL(file);
    }
  }

  handleCreateCourse = (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('info', values.info);
    formData.append('description', values.description);
    formData.append('image', this.state.selectedImage);
    formData.append('theme_id', this.state.selectedThemeItem._id);
    formData.append('theme_name', this.state.selectedThemeItem.name);
    this.props.onAddCoursecover(formData);
    this.setState({
      showCreateInstructor: false,
      selectedThemeItem: null,
      selectedImage: null
    })
  }

  //EDITOR

  editCourseCoverHandler = (theme) => {
    this.props.onGetCourseList()
    this.setState({
      showEditor: true,
      editedCover: theme,
    })
  }

  closeEditorHandler = () => {
    this.setState({
      openCategoriesList: false,
      showEditor: false,
      editedCover: null,
      selectedImage: null,
      selectedThemeItem: null,
    })
  }

  handleUpdateCourseCover = (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('info', values.info);
    formData.append('description', values.description);
    formData.append('image', this.state.selectedImage ? this.state.selectedImage : '1');
    formData.append('old_image', values.image);
    formData.append('theme_id', this.state.selectedThemeItem ? this.state.selectedThemeItem._id : values.theme._id);
    formData.append('author_name', localStorage.getItem('username'));    
    formData.append('theme_name', this.state.selectedThemeItem ? this.state.selectedThemeItem.name : values.name);
    this.props.onUpdateCourseCover(formData, values._id);
    this.closeEditorHandler();
  }

  deleteCourseCover = () => {
    this.props.onDeleteCourseCover(this.state.courseElToDelete);
    this.setState({
      confirmDialog: false,
      courseElToDelete: null
    })
  }

  handleOpenConfirmDialog = (courseId) => {
    this.setState({ 
      confirmDialog: true,
      courseElToDelete: courseId
    });
  };

  handleCloseConfirmDialog = () => {
    this.setState({ 
      confirmDialog: false,
      courseElToDelete: null
    });
  };

  leaveMouseHandler = () => {
    this.setState({
      openCategoriesList: false,
      openSubcategoriesList: false,
      openThemesList: false
    })
  }


  render(){
    const { classes, courseList } = this.props;
    return (      
      <React.Fragment>
        <div className='instructor__listItem col-md-3 mb-4 d-flex justify-content-center align-items-center'>
          <Fab onClick={this.openCreateInstrucor} className={classes.fab}>
            <AddIcon />
          </Fab>
        </div>
        {this.props.userCoursesCovers ?
        <React.Fragment>          
          {this.props.userCoursesCovers.map(course => (
              <CourseCover
                key={course._id} 
                openConfirmDialog={this.handleOpenConfirmDialog}
                course={course}
                classes={classes}
                editCourseCover={this.editCourseCoverHandler}
                />
            ))}  
            <Dialog
              open={this.state.confirmDialog}
              onClose={this.handleCloseConfirmDialog}>
              <DialogTitle>Confirm</DialogTitle>
              <DialogContent>
                <DialogContentText >
                  Are You really shure to delete this course cover with all courses inside ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseConfirmDialog} color="primary" className='instructorForm__deleteBtn'>
                  Disagree
                </Button>
                <Button onClick={this.deleteCourseCover}  className='instructorForm__cancelButton' color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>    
          <Dialog
            open={this.state.showCreateInstructor}
            onClose={this.closeCreateInstructor}>
            <DialogTitle>
              Creator
            </DialogTitle>
            <DialogContent>              
              <MyCoursesInstructorForm
                form='createInstructor'
                editedCover={this.state.editedCover}
                chosenCategoryName={this.state.selectedChosenCategory}
                chosenSubcategoryName={this.state.selectedChosenSubcategory}
                leaveMouseHandler={this.leaveMouseHandler}
                courseList={courseList}
                closeCreateInstructor={this.closeCreateInstructor}
                selectedCategoryEl={this.state.selectedCategoryEl}
                selectedSubcategoryEl={this.state.selectedSubcategoryEl}
                selectedThemeEl={this.state.selectedThemeEl}
                openCategoriesList={this.state.openCategoriesList}
                openSubcategoriesList={this.state.openSubcategoriesList}
                openThemesList={this.state.openThemesList}
                subcategories={this.state.subcategories}
                themes={this.state.themes}
                selectedThemeItem={this.state.selectedThemeItem}
                selectedImage={this.state.selectedImage}
                imagePreviewUrl={this.state.imagePreviewUrl}
                openPopperHandler={this.openPopperHandler}
                showSubcategoriesHandler={this.showSubcategoriesHandler}
                showThemesHandler={this.showThemesHandler}
                selectedThemeItemHandler={this.selectedThemeItemHandler}
                selectImage={this.selectImage}
                onSubmit={this.handleCreateCourse}/>
            </DialogContent>
          </Dialog>  
        </React.Fragment> 
        : <Spinner /> }
        <Dialog
            open={this.state.showEditor}
            onClose={this.closeEditorHandler}>
            <DialogTitle>
              Editor
            </DialogTitle>
            <DialogContent>              
              <MyCoursesInstructorForm
                form='updateCover'
                editedCover={this.state.editedCover}
                chosenCategoryName={this.state.selectedChosenCategory}
                chosenSubcategoryName={this.state.selectedChosenSubcategory}
                leaveMouseHandler={this.leaveMouseHandler}
                courseList={courseList}
                selectImage={this.selectImage}
                openCategoriesList={this.state.openCategoriesList}
                selectedCategoryEl={this.state.selectedCategoryEl}
                selectedSubcategoryEl={this.state.selectedSubcategoryEl}
                selectedThemeEl={this.state.selectedThemeEl}
                openSubcategoriesList={this.state.openSubcategoriesList}
                openThemesList={this.state.openThemesList}
                openPopperHandler={this.openPopperHandler}
                showSubcategoriesHandler={this.showSubcategoriesHandler}
                showThemesHandler={this.showThemesHandler}
                subcategories={this.state.subcategories}
                themes={this.state.themes}
                selectedThemeItem={this.state.selectedThemeItem}
                selectedThemeItemHandler={this.selectedThemeItemHandler}
                selectedImage={this.state.selectedImage}
                imagePreviewUrl={this.state.imagePreviewUrl}
                onSubmit={this.handleUpdateCourseCover}
                initialValues={this.state.editedCover}
                closeEditor={this.closeEditorHandler}/>
            </DialogContent>
          </Dialog>  
      </React.Fragment>

  
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    userCoursesCovers: state.courseCovers.courseCovers,
    loading: state.courseCovers.loading,
    error: state.courseCovers.error,
    courseList: state.courseList.courseList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCourseList: () => dispatch(actionCourse.getCourseList()),
    onGetCourseCovers: () => dispatch(action.getCourseCovers()),
    onAddCoursecover: (data) => dispatch(action.addCourseCover(data)),
    onUpdateCourseCover: (values,courseCoverId) => dispatch(action.updateCourseCover(values, courseCoverId)),
    onDeleteCourseCover: (id) => dispatch(action.deleteCourseCover(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyCoursesInstructor));