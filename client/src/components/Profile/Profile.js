import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/profileActions';
import  ProfileForm  from './ProfileForm/ProfileForm';
import './ProfileForm/ProfileForm.scss';

class Profile extends Component {
  componentWillMount(){
    const username = localStorage.getItem('username');
    console.log(username);
    this.props.onGetProfile(username);
  }

  render() {
    return (
      <section className='profile'>
        <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-4'>            
            <ProfileForm
              initialValues={this.props.profile}
              loading={this.props.loading}
              onSubmit={this.submit}/>
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
    onGetProfile: (username) => dispatch(actions.profile(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
