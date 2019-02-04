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
    const username = localStorage.getItem('username');
    this.props.onChangePassword(username, values);
  }

  changeUserDataHandler = (values) => {
    const username = localStorage.getItem('username');
    this.props.onChangeUserData(username, values);
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
      avatar = `http://localhost:5000/${this.props.avatar.userImage}`;
      
      
    }else if(!this.props.avatar && this.props.userData && this.props.userData.userImage){
      avatar = `http://localhost:5000/${this.props.userData.userImage}`;
    }
    console.log(avatar)
    

    return (
      <section className='profile'>
      
        <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-5 profile__container'> 
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
              deleteAvatar={this.deleteAvatar}
              showDeleteButton={this.props.showDeleteButton}/>
            </div>
            <h3 className='profile__nickName'>
              {this.props.userData ? this.props.userData.username : null}
            </h3>
            <ProfileChangeData 
              loading={this.props.loading}
              initialValues={this.props.userData}
              onSubmit={this.changeUserDataHandler}/>    
            <ProfileChangePassword 
              onSubmit={this.changePasswordHandler}/> 
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
    showDeleteButton: state.profile.showDeleteButton
}
}


const mapDispatchToProps = (dispatch) => {
  return {
    onChangePassword: (username, values) => {dispatch(actions.passwordChange(username, values))
      console.log('ON CHANGE PASSWORD')
    },
    onChangeUserData: (username, values) => {dispatch(actions.userDataChange(username, values))
      console.log('ON CHANGE USER DATA')
    },
    onGetUserData: () => {dispatch(actions.getUserData())
      console.log('ON GET USER DATA ACTION')
    },
    onUpdateUserImage: (image) => {dispatch(actions.avatarUpload(image))
      console.log('ON UPDATE USER IMAGE')
    },
    onDeleteUserImage: () => dispatch(actions.deleteAvatar())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
