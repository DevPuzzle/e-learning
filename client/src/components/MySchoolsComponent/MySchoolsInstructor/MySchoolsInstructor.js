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
import axios from 'axios';

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
    cities: [],
    selectedCity: null,
    selectedState: null
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

  createSchoolHandler = (values) => {
/*name state city address info image logo  formData.append('name', values.name);*/
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('state', this.state.selectedState);
    formData.append('city', this.state.selectedCity);
    formData.append('address', values.address);
    formData.append('info', values.info);
    formData.append('image', this.state.selectedBackgroundImage);
    formData.append('logo', this.state.selectedLogo);
    this.props.onAddSchoolCover(formData);
  }

  deleteSchoolCoverHandler = (id) => {
    this.props.onDeleteSchoolCover(id)
  }

  //CITIES

  fetchCities = (city) => {
    const cityUrl = 'http://localhost:5000';
    axios.post(`${cityUrl}/search/cities/filter`, {city})
    .then(response => {
      this.setState({
        cities: response.data
      })
    })
  }

  inputChange = (e) => {
    if(!e.target.value){
      return
    }
    this.fetchCities(e.target.value);
  }

  downshiftOnChange = (selectedItem) => {
    this.setState({
      selectedCity: selectedItem.city,
      selectedState: selectedItem.state
    })
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
              deleteSchoolCover={this.deleteSchoolCoverHandler}
              classes={classes}/>
          ))}
          <Dialog
            open={this.state.showCreateInstructor}
            onClose={this.closeCreateInstructor}>
            <DialogTitle>
              Creator
            </DialogTitle>
            <DialogContent>
              <MySchoolInstructorForm
                form='createSchool'
                onSubmit={this.createSchoolHandler}
                selectedCity={this.state.selectedCity}
                downshiftOnChange={this.downshiftOnChange}
                inputChange={this.inputChange}
                cities={this.state.cities}
                citiesData={this.props.cities}
                getSuggestions={this.getSuggestions}
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
    userSchoolCovers: state.schoolCovers.schoolCovers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSchoolCovers: () => dispatch(action.getSchoolCovers()),
    onAddSchoolCover: (data) => dispatch(action.addSchoolCover(data)),
    onDeleteSchoolCover: (id) => dispatch(action.deleteSchoolCover(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MySchoolsInstructor));