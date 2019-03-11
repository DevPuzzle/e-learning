import React, { Component } from 'react';
import {getCourseCollection} from '../../../actions/courseCoverActions';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  
  componentWillMount(){
    this.props.onGetCourseCollection()
  }

  render(){
    return (
      <React.Fragment>
        {this.props.courseCollection ? this.props.courseCollection.map(course => (
          <div className='col-md-3' key={course._id}>
        <Card
          className={this.props.classes.card}>
        <CardActionArea>
        <CardMedia
          className={this.props.classes.media}
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
             <Typography 
              style={{
                color: 'rgba(0, 0, 0, 0.54)'
              }}
              component="p">
              {`${course.theme.name}`}
            </Typography> 
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button 
            className='instructorForm__deleteBtn'
            size='small'>
            Delete
          </Button>
        </CardActions>
      </Card>
        </div>
        )) : null}
        
      </React.Fragment>
      
    )
  }
}

const mapStateToProps = (state) => {  
  return {
    courseCollection: state.courseCollectionReducer.courseCollection
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
    onGetCourseCollection: () => dispatch(getCourseCollection())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyCoursesCollection));