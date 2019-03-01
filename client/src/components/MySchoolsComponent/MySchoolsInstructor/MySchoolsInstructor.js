import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import * as action from '../../../actions/schoolCoverActions';
import SchoolCover from './SchoolCover/SchoolCover';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import MySchoolInstructorForm from './MySchoolsInstructorForm/MySchoolInstructorForm';
import AddressData from '../../../address.json';

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




 class MySchoolsInstructor extends Component {
   state = {
    showCreateInstructor: false,
    backgroundImagePreviewUrl: null,
    selectedBackgroundImage: null,
    logoImagePreviewUrl: null,
    selectedLogo: null,
   }

   componentDidMount(){
    this.props.onGetSchoolCovers();
  }

  //CREATE INSTRUCTOR

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

  selectBackgroundImageHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        backgroundImagePreviewUrl: reader.result,
        selectedBackgroundImage: file
      });
    }
    if(e.target.files[0]){
      reader.readAsDataURL(file)
    }
  }

  selectLogoHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        logoImagePreviewUrl: reader.result,
        selectedLogo: file
      });
    }
    if(e.target.files[0]){
      reader.readAsDataURL(file)
    }
  }

  render() {
    const { classes } = this.props;
    return (
     <React.Fragment>
       <div className='col-md-3 mb-4 d-flex justify-content-center align-items-center'>
        <Fab onClick={this.openCreateInstrucor} className={classes.fab}>
          <AddIcon />
        </Fab>
       </div>
       {this.props.userSchoolCovers ? 
        <React.Fragment>
          {this.props.userSchoolCovers.map(schoolCover => (
            <SchoolCover 
              key={schoolCover._id}
              schoolCover={schoolCover}
              classes={classes}/>
          ))}
          <Dialog
            open={this.state.showCreateInstructor}
            onClose={this.closeCreateInstructor}>
            <DialogTitle>
              Creator
            </DialogTitle>
            <DialogContent 
            className='RRRRRRR'>
              <MySchoolInstructorForm
                cities={this.props.cities}
                getSuggestions={this.getSuggestions}
                form='createSchool'
                getCities={this.props.onGetCities}
                address={AddressData.addresses}
                selectBackgroundImageHandler={this.selectBackgroundImageHandler}
                backgroundImagePreviewUrl={this.state.backgroundImagePreviewUrl}
                selectedBackgroundImage={this.state.selectedBackgroundImage}
                selectLogoHandler={this.selectLogoHandler}
                selectedLogo={this.state.selectedLogo}
                logoImagePreviewUrl={this.state.logoImagePreviewUrl}
                />
                
            </DialogContent>
          </Dialog>
        </React.Fragment> : <Spinner />}
    </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userSchoolCovers: state.schoolCovers.schoolCovers,
    cities: state.cities.cities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSchoolCovers: () => dispatch(action.getSchoolCovers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MySchoolsInstructor));