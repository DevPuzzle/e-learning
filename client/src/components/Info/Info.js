import React from 'react';
import Button from '@material-ui/core/Button/Button';
import './Info.scss';

const Info = () => {
  return(
    <div className='info'>
    <Button 
    className='info__btn'
    variant="contained" 
    color="primary" >
      Sign up for a course
    </Button> 
    <Button 
    className='info__btn'
    variant="contained" 
    color="primary" >
      Subscribe to school
    </Button>     
    <Button 
    className='info__btn'
    variant="contained" 
    color="primary" >
      Become a teacher
    </Button>  
    <Button 
    className='info__btn'
    variant="contained" 
    color="primary" >
      Create a school
    </Button>  
    </div>
  )
}

export default Info;
