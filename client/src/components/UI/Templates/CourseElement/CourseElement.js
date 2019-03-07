import React, { Component } from 'react';
import './CourseElement.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {getCourse} from '../../../../actions/courseCoverActions';
import Spinner from '../../Spinner/Spinner';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import axios from 'axios';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};


 class CourseElement extends Component  {

  componentWillMount(){
    this.props.onGetCourse(this.props.match.params.name);
  }

  addCourse = (id) => {
    console.log('click')
    axios.post(' http://localhost:5000/course/addingToCollection', {course_id: id})
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    const { classes } = this.props;
    let render;
    if(this.props.course){
      render = (
        <React.Fragment>
          <div className='courseEl__background'>
          <div className='container'>
            <div className='row courseEl__overEl'>
              <div className='courseEl__content col-md-7'>
                <h3 className='courseEl__title'>
                  {this.props.course.name}
                </h3>
                <h4 className='courseEl__info'>
                  {this.props.course.info}
                </h4>
              </div>
              <div className='col-md-5 courseEl__card'>
                <Card className={classes.card}>
                  <CardMedia 
                    className={classes.media}
                    image={`http://localhost:5000/${this.props.course.image}`}/>
                  <CardContent>
                    <Typography 
                      className='courseEl__cardTitle'
                      gutterBottom variant="h5" component="h2">
                      {this.props.course.name}
                    </Typography>
                    <p
                      className='courseEl__cardAuthor'>{this.props.course.author.name}</p>
                    <p
                      className='courseEl__cardDescr'>{this.props.course.description}</p>
                    <div className='courseEl__btn'>
                      <Button 
                        variant='contained' 
                        color='secondary' 
                        onClick={() => this.addCourse(this.props.course._id)}>Add to cart</Button>
                    </div>
                   
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
        <div className='courseEl__descriptionContent row'>
          <div className='col-md-7'>
            <h3 className='courseEl__descrTitle'>What will you learn</h3>
            <div className='courseEl__descriptionCard'>
            {this.props.course.description}
            </div>
            <h3 className='courseEl__descrTitle'>
              Course material
            </h3>
            <div className='courseEl__toLearnCard'>
              Private
            </div>
          </div>
        </div>
       
        </div>
        <div className='courseEl__hidden'>
            <div className='row courseEl__hiddenCont'>
              <div className='courseEl__hiddenImg'>
                <img src={`http://localhost:5000/${this.props.course.image}`} alt=""/>
              </div>
              <div className='courseEl__hiddenBtn'>
                <Button 
                  variant='contained' 
                  color='secondary' 
                  onClick={() => this.addCourse(this.props.course._id)}>Add to cart</Button>
              </div>
            </div>
        </div>
        </React.Fragment>
      )
    }else {
      render = <div style={{height: 'calc(100vh - 147px)'}}><Spinner /></div>
    }

    return (
      <section className='courseEl'>
        {render}
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    course: state.courseReducer.course
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCourse: (id) => dispatch(getCourse(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(CourseElement)));