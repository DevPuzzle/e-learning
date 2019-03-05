import React from "react";
import './AdminDeleteModal.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const AdminDeleteModal = (props) => {
  return (
    <Dialog
    open={props.openDeleteModal}
    onClose={props.closeDeleteHandler}>
    {/* <DialogTitle >Delete</DialogTitle> */}
    <DialogContent className='dialogContent'>
      <DialogContentText >
        Are you really shure delete?
      </DialogContentText>
    </DialogContent>
    <DialogActions className='dialogAction'>
      <Button onClick={props.closeDeleteModalHandler} color="secondary">
        Disagree
      </Button>
      <Button onClick={props.delete} color="primary" autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default AdminDeleteModal;