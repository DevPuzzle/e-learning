import React from 'react';
import Button from '@material-ui/core/Button/Button';
import './Info.scss';

const Info = (props) => {
  return(
    <div className='info'>
    <Button 
      onClick={() => props.history.push('/login')}
      className='info__btn'
      variant="contained" 
      color="primary" >
      Sign up for a course
    </Button> 
    <Button 
      className='info__btn'
      variant="contained" 
      color="primary" 
      onClick={() => props.history.push('/school/list')}>
      Subscribe to school
    </Button>     
    <Button 
      className='info__btn'
      variant="contained" 
      color="primary" 
      onClick={() => props.history.push('/signup')}>
      Become a teacher
    </Button>  
    <Button 
      className='info__btn'
      variant="contained" 
      color="primary" 
      onClick={() => props.history.push('/signup')}>
      Create a school
    </Button>  
    </div>
  )
}

export default Info;
