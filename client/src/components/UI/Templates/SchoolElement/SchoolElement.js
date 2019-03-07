import React, { Component } from 'react';
import './SchoolElement.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {getSchool} from '../../../../actions/schoolCoverActions';
import Spinner from '../../Spinner/Spinner';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, Button, Dialog, Slide, DialogActions } from '@material-ui/core';
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

 class SchoolElement extends Component  {

  state = {
    successAdded: false,
    error: false
  }

  componentWillMount(){
    this.props.onGetSchool(this.props.match.params.name);
  }

  addSchool = (id) => {
    axios.post('http://localhost:5000/school/addingToCollection', {school_id: id})
    .then(response => {
      this.setState({
        successAdded: true
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
    if(this.props.school){
      render = (
        <React.Fragment>
          <div className='schoolEl__background'
            style={{
              background: `url(http://localhost:5000/${this.props.school.image}) no-repeat center center`
            }}>
          <div className='container'>
            <div className='row schoolEl__overEl'>
              <div className='schoolEl__content col-md-7'>
                <h3 className='schoolEl__title'>
                  {this.props.school.name}
                </h3>
                <h4 className='schoolEl__info'>
                  {this.props.school.state}, {this.props.school.city}
                </h4>
              </div>
              <div className='col-md-5 schoolEl__card'>
                <Card className={classes.card}>
                  <CardMedia 
                    className={classes.media}
                    image={`http://localhost:5000/${this.props.school.logo}`}/>
                  <CardContent>
                    <Typography 
                      className='schoolEl__cardTitle'
                      gutterBottom variant="h5" component="h2">
                      {this.props.school.name}
                    </Typography>
                     <p
                      className='schoolEl__cardStreet'>{this.props.school.address}</p>
                    <p
                      className='schoolEl__cardDescr'>{this.props.school.info}</p> 
                    <div className='schoolEl__btn'>
                      <Button
                        onClick={() => this.addSchool(this.props.school._id)} 
                        variant='contained' 
                        color='secondary'>Subscribe</Button>
                    </div>
                   
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
        <div className='schoolEl__descriptionContent row'>
          <div className='col-md-7'>
            <h3 className='schoolEl__descrTitle'>
              About us
            </h3>
            <div className='schoolEl__descriptionCard'>
            {this.props.school.info}
            </div>
            <h3 className='schoolEl__descrTitle'>
              Our material
            </h3>
            <div className='schoolEl__toLearnCard'>
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
                Sorry but only logged users can subscribe.
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
        <div className='schoolEl__hidden' style={{background: `url(http://localhost:5000/${this.props.school.image}) no-repeat center center`}}>
            <div className='row schoolEl__hiddenCont'>
              <div className='schoolEl__hiddenImg'>
                <img src={`http://localhost:5000/${this.props.school.logo}`} alt=""/>
              </div>
              <div className='schoolEl__hiddenBtn'>
                <Button 
                  onClick={() => this.addSchool(this.props.school._id)}
                  variant='contained' color='secondary'>Subscribe</Button>
              </div>
            </div>
        </div>
        </React.Fragment>
      )
    }else {
      render = <div style={{height: 'calc(100vh - 147px)'}}><Spinner /></div>
    }

    return (
      <section className='schoolEl'>
        {render}
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.schoolReducer.school)
  return {
    school: state.schoolReducer.school
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSchool: (id) => dispatch(getSchool(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SchoolElement)));