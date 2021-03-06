import React, { Component } from 'react';
import {getCourseCollection, deleteCourseCollection} from '../../../actions/courseCoverActions';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteModal from '../../UI/Templates/DeleteModal/DeleteModal';
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



class MyCoursesCollection extends Component {

  state = {
    itemToDelete: null,
    showDelete: false
  }
  
  componentWillMount(){
    this.props.onGetCourseCollection()
  }

  showDeleteModal = (id) => {
    this.setState({
      itemToDelete: id,
      showDelete: true
    })
  }

  deleteCourseCollectionHandler = () => {
    this.props.onDeleteCourseCollection(this.state.itemToDelete);
    this.setState({
      itemToDelete: null,
      showDelete: false
    })
  }

  closeDeleteModal = () => {
    this.setState({
      itemToDelete: null,
      showDelete: false
    })
  }

  render(){
    return (
      <React.Fragment>
        {this.props.loading ?
          <Spinner />
          :
          this.props.courseCollection ? 
          this.props.courseCollection.map(course => (
          <div className='col-md-3 mb-4' key={course._id}>
        <Card
          className={`${this.props.classes.card} mx-auto`}>
        <CardActionArea>
        <CardMedia
          className={this.props.classes.media}
          image={`/${course.image}`}
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
             <Typography 
              style={{
                color: 'rgba(0, 0, 0, 0.54)',
                fontSize: '18px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
              component="p">
              {`${course.theme.name}`}
            </Typography> 
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button 
            onClick={() => this.showDeleteModal(course._id)}
            className='instructorForm__deleteBtn'
            size='small'>
            Delete
          </Button>
        </CardActions>
      </Card>
        </div>
        )) : null}
        <DeleteModal 
          item={this.state.itemToDelete}
          open={this.state.showDelete}
          handleClose={this.closeDeleteModal}
          delete={this.deleteCourseCollectionHandler}/>        
      </React.Fragment>
      
    )
  }
}

const mapStateToProps = (state) => {  
  return {
    courseCollection: state.courseCollectionReducer.courseCollection,
    loading: state.courseCollectionReducer.loading,
    error: state.courseCollectionReducer.error

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCourseCollection: () => dispatch(getCourseCollection()),
    onDeleteCourseCollection: (id) => dispatch(deleteCourseCollection(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyCoursesCollection));