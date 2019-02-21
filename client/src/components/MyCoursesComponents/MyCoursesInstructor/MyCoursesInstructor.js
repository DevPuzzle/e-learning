import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
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
           {this.props.userCoursesCovers ?
           <React.Fragment>
             <div className='instructor__listItem col-md-3 mb-4 d-flex justify-content-center align-items-center'>
            <Fab onClick={this.openCreateInstrucor} className={classes.fab}>
              <AddIcon />
            </Fab>
          </div>
        {this.props.userCoursesCovers.map(course => (
            <div 
              className='col-md-3 mb-4'  
              key={course._id}>
              <Card 
                className={classes.card}>
                <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={`http://localhost:5000/${course.image}`}
                  title={course.name}/>
                  <CardContent>
                    <Typography 
                      gutterBottom 
                      component="h2"
                      style={{
                        fontSize: '18px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden'
                      }}>
                        {course.name}
                    </Typography>
                    {/* <Typography 
                      component="p">
                      {course.theme}
                    </Typography> */}
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
          
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
           : <Spinner /> } 
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