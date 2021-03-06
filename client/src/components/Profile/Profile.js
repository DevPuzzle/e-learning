import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/profileActions';
import './Profile.scss';
import ProfileChangePassword from './ProfileChangePassword/ProfileChangePassword';
import ProfileChangeData from './ProfileChangeData/ProfileChangeData';
import ProfileImageChange from './ProfileImageChange/ProfileImageChange';
import defaultImage from '../../assets/images/default-avatar.png';


class Profile extends Component {
  state = {
    selectedImage: null,
  }

  componentDidMount(){
    this.props.onGetUserData();
  }

  changes = (e) => {
      this.setState({
        selectedImage: e.target.files[0]
      })
    
  }
 
  changePasswordHandler = (values) => {
   
    this.props.onChangePassword(values);
  }

  changeUserDataHandler = (values) => {
    
    this.props.onChangeUserData(values);
  }

  changeUserImage = () => {
    this.props.onUpdateUserImage(this.state.selectedImage);
    this.setState({
      selectedImage: null
    })
  }

  deleteAvatar = () => {
    this.props.onDeleteUserImage();
    
  }

  render() {

     let avatar = defaultImage;
    if(this.props.avatar && this.props.avatar.userImage ){
      avatar = `/${this.props.avatar.userImage}`;
      
      
    }else if(!this.props.avatar && this.props.userData && this.props.userData.userImage){
      avatar = `/${this.props.userData.userImage}`;
    }
    

    return (
      <section className='profile'>
      
        <div className='container'>
        <div className='row justify-content-center align-items-center flex-column'>
        <div className='col-md-5'>
          <h3 className='profile__title'>Photo</h3>
          <div className='profile__container mb-4'> 
            <div className='profile__main'>
              <div className='profile__image'>
                <img src={avatar} alt=""/>
              </div>
            <ProfileImageChange
              avatar={avatar}
              defaultImage={defaultImage}
              selectedImage={this.state.selectedImage}
              changes={this.changes} 
              onSubmit={this.changeUserImage}
              profileError={this.props.imageError}/>
            </div>
            </div>
        </div>
        <div className='col-md-5'>
          <h3 className='profile__title'>Profile</h3>
            <div className='profile__container mb-4'> 
            <h3 className='profile__nickName'>
              {this.props.userData ? this.props.userData.username : null}
            </h3>
            <ProfileChangeData 
              loading={this.props.loading}
              initialValues={this.props.userData}
              onSubmit={this.changeUserDataHandler}
              profileError={this.props.error}/>    
            </div>
          </div>
            <div className='col-md-5'>
            <h3 className='profile__title'>Password</h3>
            <div className='profile__container mb-4'> 
            <ProfileChangePassword 
              onSubmit={this.changePasswordHandler}
              profileError={this.props.passwordChange}/> 
            </div>
            </div>
                              
        </div>       
        </div>
      </section>      
      
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.profile.userData,
    avatar: state.profile.avatar,
    loading: state.profile.loading,
    showDeleteButton: state.profile.showDeleteButton,
    error: state.profile.error,
    imageError: state.profile.imageError,
    passwordError: state.profile.passwordError
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onChangePassword: (values) => {dispatch(actions.passwordChange(values))
    },
    onChangeUserData: (values) => {dispatch(actions.userDataChange(values))
    },
    onGetUserData: () => {dispatch(actions.getUserData())
    },
    onUpdateUserImage: (image) => {dispatch(actions.avatarUpload(image))
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
