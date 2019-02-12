import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
const AddButton = (props) => {
  return (
      <Fab className={props.className} onClick={props.adding}>
        <AddIcon />
      </Fab>
  )
}

export default AddButton;