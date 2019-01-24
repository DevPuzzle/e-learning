import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/userActions';


class Profile extends Component {
  componentDidMount(){
    this.props.onGetUser();
  }

  render() {
    return (
      <div>
        Profile

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUser: () => dispatch(actions.user())
  }
}

export default connect(null, mapDispatchToProps)(Profile) ;
