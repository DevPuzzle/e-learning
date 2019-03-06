import React, { Component } from 'react';
import './SchoolElement.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {getSchool} from '../../../../actions/schoolCoverActions';
import Spinner from '../../Spinner/Spinner';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};


 class SchoolElement extends Component  {

  componentWillMount(){
    this.props.onGetSchool(this.props.match.params.name);
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
                      <Button variant='contained' color='secondary'>Subscribe</Button>
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
        <div className='schoolEl__hidden' style={{background: `url(http://localhost:5000/${this.props.school.image}) no-repeat center center`}}>
            <div className='row schoolEl__hiddenCont'>
              <div className='schoolEl__hiddenImg'>
                <img src={`http://localhost:5000/${this.props.school.logo}`} alt=""/>
              </div>
              <div className='schoolEl__hiddenBtn'>
                <Button variant='contained' color='secondary'>Subscribe</Button>
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