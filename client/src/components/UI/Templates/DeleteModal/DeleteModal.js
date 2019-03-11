import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@material-ui/core';

 const DeleteModal = (props) => {
  return (
    <Dialog
    open={props.open}
    onClose={props.handleClose}>
    <DialogTitle>Confirm</DialogTitle>
    <DialogContent>
      <DialogContentText >
        Are You really shure to delete this course cover with all courses inside ?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose} color="primary" className='instructorForm__deleteBtn'>
        Disagree
      </Button>
      <Button onClick={props.delete}  className='instructorForm__cancelButton' color="primary" autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>    
  )
}

export default DeleteModal;