import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions/verifyEmailActions';
import Spinner from '../UI/Spinner/Spinner';


 class VerifyEmailPage extends Component {

  componentWillMount(){
    this.props.onGetVerify(this.props.match.params.code);
  }

  render() {
    let verifyRender = <div>VERIFY</div>
   if(this.props.loading){
     verifyRender = <Spinner />
   }else if(this.props.error){
     verifyRender = <div>we have probleb</div>
   }
    return (
      <div>
        {verifyRender}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.verifyEmail.loading,
    error: state.verifyEmail.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetVerify: (code) => dispatch(actions.verifyEmail(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VerifyEmailPage));