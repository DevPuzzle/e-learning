import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

 class ErrorComponent extends Component {


  componentWillMount(){
   

    if(this.props.location.pathname !== '/errorPage'){
      this.props.history.push('/errorPage');
    }
    
    
  }

  render() {
    
    return (
      <div>
        errrrrrrrrrr
      </div>
    )
  }
}

export default withRouter(ErrorComponent);