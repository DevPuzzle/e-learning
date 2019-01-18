import React, { Component } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';



class Modal extends Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render(){
    const { classes, onClose, selectedValue } = this.props;
    return(
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" >
      </Dialog>
    )
  }
}
  export default Modal;