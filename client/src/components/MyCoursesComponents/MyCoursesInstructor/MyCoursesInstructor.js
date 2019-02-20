import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import MyCoursesInstructorForm from './MyCoursesInstructorForm/MyCoursesInstructorForm';
import { connect } from 'react-redux';
import * as action from '../../../actions/courseCoverActions';
import * as actionCourse from '../../../actions/courseListActions';
import Spinner from '../../UI/Spinner/Spinner';

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
});

class MyCoursesInstructor extends Component{
  state = {
    showCreateInstructor: false,
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
      showCreateInstructor: false
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

  render(){
    const { classes, courseList } = this.props;
    return (
         <React.Fragment>
             <div className='instructor__listItem col-md-3'>
            <Fab onClick={this.openCreateInstrucor} className={classes.fab}>
              <AddIcon />
            </Fab>
          </div>
         { this.props.userCoursesCovers && this.props.userCoursesCovers.user_courses
          ? this.props.userCoursesCovers.user_courses.course.map(course => (
            <div 
              key={course._id}
              className='instructor__listItem col-md-3'>
              {course.name}
            </div>
          )): null }
          
          <Dialog
            open={this.state.showCreateInstructor}
            onClose={this.closeCreateInstructor}>
            <DialogTitle>
                Creator
              </DialogTitle>
            <DialogContent>              
              <MyCoursesInstructorForm
                courseList={courseList}/>
            </DialogContent>
          </Dialog>
          </React.Fragment>    
  
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    userCoursesCovers: state.courseCovers.courseCovers,
    courseList: state.courseList.courseList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCourseList: () => dispatch(actionCourse.getCourseList()),
    onGetCourseCovers: () => dispatch(action.getCourseCovers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyCoursesInstructor));