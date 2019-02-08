import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spinner from '../components/UI/Spinner/Spinner';
import * as actions from '../actions/adminActions/loginActions';

export default function(ComposedClass){
  class AuthenticationCheck extends Component {
    state={
      loading: false
    }

    componentWillMount(){
      this.props.dispatch(actions.login())
    }

    componentWillReceiveProps(nextProps){
      console.log(nextProps)
    }

    render() {
      if(this.state.loading){
        return <Spinner />
      }
      return (
        <ComposedClass {...this.props} />
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      login: state.loginAdmin.token
    }
  }

  return connect(mapStateToProps)(AuthenticationCheck)
}


