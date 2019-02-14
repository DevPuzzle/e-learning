import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.scss';
import LoginForm from './LoginForm/LoginForm';
import * as actions from '../../actions/loginActions';
import Spinner from '../UI/Spinner/Spinner';
import { withRouter } from 'react-router';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

class Login extends Component {

  state = {
    openForgotPasswordModal: false,
  };

  handleClickOpenForgotPasswordModal = () => {
    this.setState({ openForgotPasswordModal: true });
  };
  handleClose = () => {
    this.setState({ openForgotPasswordModal: false });
  };

  submit = (values) => {
    const data = {
      email: values.email.trim(),
      password: values.password
    }
    this.props.onLoginUser(data, this.props.history);
  }

  render(){ 
    let loginForm = <LoginForm
    openModal={this.handleClickOpenForgotPasswordModal}
    userError={this.props.error} 
    onSubmit={this.submit}/>;
    if(this.props.loading){
      loginForm = <Spinner />
    }
    

  return(
    <div className='login'>
      <Dialog
        open={this.state.openForgotPasswordModal}
        onClose={this.handleClose}>
        <DialogContent>
          <DialogContentText>
            Please, enter your email and we will send you new password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth/>
            <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
      {loginForm}
    </div>
  )
}
}



const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUser: (values, history) => dispatch(actions.login(values, history))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
