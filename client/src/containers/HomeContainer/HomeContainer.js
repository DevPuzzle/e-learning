import React, { Component } from 'react'
import './HomeContainer.scss';
import Button from '@material-ui/core/Button';


 class HomeContainer extends Component {
  render() {
    return (
      <section className='home'>
        <div className='home__banner'>
          <div className='banner__content'>
          <h1 className='home__title'>
            Study Anytime Anywhere 
          </h1> 
          <Button 

          className='home__btn'
          variant="contained" 
          color="primary" >
            Add Knowledges
          </Button>     
          </div>
          
        </div>
      </section>
    )
  }
}

export default HomeContainer;