import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions/verifyEmailActions';
import Spinner from '../UI/Spinner/Spinner';
import VerifyError from './VerifyEror/VerifyError';
import VerifySuccess from './VerifySuccess/VerifySuccess';


 class VerifyEmailPage extends Component {

  componentWillMount(){
    this.props.onGetVerify(this.props.match.params.code);
  }


  render() {
    let verifyRender = <VerifySuccess />
   if(this.props.loading){
     verifyRender = 
      <div style={{
        height: 'calc(100vh - 128px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}><Spinner /></div>
   }else if(this.props.error){
     verifyRender = <VerifyError />
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