import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';
import Spinner from '../../UI/Spinner/Spinner';

 const ForgotPassword = (props) => {
   let renderForm = <ForgotPasswordForm 
   onSubmit={props.changePasswordHandler}/>
   if(props.forgotPassword.loading){
     renderForm = <Spinner />
   }
  return (
    <Dialog
        open={props.open}
        onClose={props.onClose}>
        <DialogContent>
          <DialogContentText>
            Please enter your email and we will send you a new password.
          </DialogContentText>
          {props.forgotPassword.error ? <p className='forgot-error'>We cannot find your account, please sign up first</p> : null}
          {props.forgotPassword.message ? <p className='forgot-success'>We send you new password, check your email</p> : null}
            {renderForm}
            <DialogActions className='cancelButtonCont'>
            <Button onClick={props.onClose} className='cancelButton' color="primary">
              Cancel
            </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
  )
}

export default ForgotPassword;