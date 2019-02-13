import React, { Component } from 'react'
import Spinner from '../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router';
import axios from 'axios';

 class TestVerify extends Component {

  state = {
    loading: false,
    error: null,
    message: null
  }

  componentWillMount(){
    const URL = 'http://localhost:5000/user/verifyEmail';
    const param = this.props.match.params.code
    this.setState({
      loading: true
    })
    setTimeout(()=>{
      axios.post(`${URL}`, param)
      .then(response => {
        this.setState({
          message: response.data
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err
        })
        
      })
    },5000)
  }

  render() {
    let verifyRender = <div>VERIFY</div>
    if(this.state.loading){
      verifyRender = <Spinner />
    }else if(this.state.error){
      verifyRender = <div>We have a problem</div>
    }
    return (
      <div>
        {verifyRender}
      </div>
    )
  }
}

export default withRouter(TestVerify);
