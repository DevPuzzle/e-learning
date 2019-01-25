import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/profileActions';
import './Profile.scss';
import ProfileChangePassword from './ProfileChangePassword/ProfileChangePassword';
import ProfileChangeData from './ProfileChangeData/ProfileChangeData';
import ProfileImageChange from './ProfileImageChange/ProfileImageChange';
import defaultImage from '../../assets/images/default-avatar.png';
class Profile extends Component {
 
  /* submit = (values) => {
    const username = localStorage.getItem('username');
    console.log(username);
    console.log(values)
    this.props.onChangePassword(username);
  } */

  render() {
    return (
      <section className='profile'>
        <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-5 profile__container'> 
            <div className='profile__main'>
            <div className='profile__image'>
              <img src={defaultImage} alt=""/>
            </div>         
            <ProfileImageChange />
            </div>
            <ProfileChangeData />    
            <ProfileChangePassword /> 
          </div>        
        </div>       

        </div>
      </section>      
      
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile
}
}


const mapDispatchToProps = (dispatch) => {
  return {
    onChangePassword: (username, values) => dispatch(actions.passwordChange(username, values))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
