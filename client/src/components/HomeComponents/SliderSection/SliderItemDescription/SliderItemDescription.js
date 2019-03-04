import React from 'react';
import { Button } from '@material-ui/core';

 const SliderItemDescription = (props) => {
  return (
    <div style={{padding: '15px'}}>
      <h3 style={{fontSize: '18px', 
    lineHeight: '22px', marginBottom: '10px'}}>{props.selectedItem.name}</h3>
      <p>
        {props.selectedItem.info}
      </p>
      <Button
        className='instructorForm__btn'
        variant="contained" 
        color="primary"
        type='submit'
        /* disabled={this.props.editedCover ? null : !this.props.selectedThemeItem || !this.props.selectedImage} */>
        Navigate to
      </Button>
    </div>
  )
}

export default SliderItemDescription;