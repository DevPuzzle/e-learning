import React, { Component } from 'react';
import './CourseElement.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {getCourse} from '../../../../actions/courseCoverActions';
import Spinner from '../../Spinner/Spinner';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, Button, Dialog, DialogActions, Slide  } from '@material-ui/core';
import axios from 'axios';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

 class CourseElement extends Component  {

  state = {
    successAdded: false,
    error: false,
    checkInCollection: false
      }

  componentDidMount(){
    this.props.onGetCourse(this.props.match.params.name);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.course !== this.props.course) {
      if(this.props.userData && this.props.course){
        let courseCollection = this.props.userData.course_collection;
        let findthis = courseCollection.find(el => el === this.props.course._id);
         if(findthis){
          this.setState({
            checkInCollection: true
          })
        }     
        }
      }
    }
  

  addCourse = (id) => {
    axios.post(`${window.location.origin}/api/course/addingToCollection`, {course_id: id})
    .then(response => {
      this.setState({
        successAdded: true,
        checkInCollection: true
      })
    })
    .catch(err => {
      this.setState({
        error: true
      })
    })
  }

  handleClose = () => {
    this.setState({
      successAdded: false
    })
  }

  handleCloseError = () => {
    this.setState({
      error: false
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
                    image={`/${this.props.course.image}`}/>
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
                    {this.state.checkInCollection ? 
                    <div style={{color: '#0277bd'}}><i className="fas fa-check"></i> Already subscribed</div> 
                  : <Button 
                  variant='contained' 
                  color='secondary' 
                  onClick={() => this.addCourse(this.props.course._id)}>SUBSCRIBE</Button>}
                     
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
        <Dialog
          open={this.state.successAdded}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}>
          <div className='schoolEl__successCont'>
            <div className='schoolEl__successImg'>
                <i className="far fa-check-circle"></i>
              </div>
              <div className='schoolEl__successMessage'>
                This course has been added successfully to your collection.
              </div>
              <DialogActions style={{position: 'absolute', bottom: 0, right: 0}}>
              <Button 
                className='schoolEl__successBtn' 
                onClick={this.handleClose}>
                Close
              </Button>
            </DialogActions>
          </div>
            
        </Dialog>

        <Dialog
          open={this.state.error}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleCloseError}>
          <div className='schoolEl__errorCont'>
            <div className='schoolEl__errorImg'>
              <i className="far fa-times-circle"></i>
              </div>
              <div className='schoolEl__errorMessage'>
                Sorry but only logged users can add to cart.
              </div>
              <DialogActions style={{position: 'absolute', bottom: 0, right: 0}}>
              <Button 
                className='schoolEl__errorBtn' 
                onClick={this.handleCloseError}>
                Close
              </Button>
            </DialogActions>
          </div>
            
        </Dialog>
        <div className='courseEl__hidden'>
            <div className='row courseEl__hiddenCont'>
              <div className='courseEl__hiddenImg'>
                <img src={`/${this.props.course.image}`} alt=""/>
              </div>
              <div className='courseEl__hiddenBtn'>
              {this.state.checkInCollection ?
                <div style={{color: '#fff'}} className='courseEl__hiddenCheck'><i className="fas fa-check"></i> Already subscribed</div> 
              :
              <Button 
                variant='contained' 
                color='secondary' 
                onClick={() => this.addCourse(this.props.course._id)}>SUBSCRIBE</Button>
              }
                
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
    course: state.courseReducer.course,
    userData: state.profile.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCourse: (id) => dispatch(getCourse(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(CourseElement)));