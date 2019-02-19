import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import MyCoursesInstructorForm from './MyCoursesInstructorForm/MyCoursesInstructorForm';
import { connect } from 'react-redux';
import * as action from '../../../actions/courseListActions';

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
  
  componentWillMount(){
    this.props.onGetCourseList()
  }

  openCreateInstrucor = () => {
    this.setState({
      showCreateInstructor: true
    })
  }

  closeCreateInstructor = () => {
    this.setState({
      showCreateInstructor: false
    })
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
          <div className='instructor__listItem col-md-3'>
            ALREADY CREATED
          </div>
          <Dialog
            open={this.state.showCreateInstructor}
            onClose={this.closeCreateInstructor}>
            <DialogTitle>
                Creator
              </DialogTitle>
            <DialogContent>              
              <MyCoursesInstructorForm courseList={courseList}/>
            </DialogContent>
          </Dialog>
      </React.Fragment>       
  
    )
  }  
}

const mapStateToProps = (state) => {
  
  return {
    courseList: state.courseList.courseList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCourseList: () => dispatch(action.getCourseList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyCoursesInstructor));