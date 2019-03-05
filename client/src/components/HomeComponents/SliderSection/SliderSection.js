import React, { Component } from "react";
import Slider from "react-slick";
import SliderItem from "./SliderItem/SliderItem";
import './SliderSection.scss';
import SliderItemDescription from "./SliderItemDescription/SliderItemDescription";
import { Fab } from "@material-ui/core";
import { withRouter } from 'react-router';

export const SlideLeft = ({onClick}) => (
  <Fab className='leftArr' onClick={onClick}>
    <i className="fas fa-angle-left"></i>
  </Fab>
)

export const SlideRight = ({onClick}) => (
  <Fab className='rightArr' onClick={onClick}>
    <i className="fas fa-angle-right"></i>
  </Fab>
)


class SliderSection extends Component {
  


  navigateTo = (id) => {
    console.log(id)
    this.props.history.push(`/school/${id}`)
  }

  render(){
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      prevArrow: <SlideLeft />,
      nextArrow: <SlideRight />,
      className: 'slider-courses',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            arrows:false,
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            arrows:false,
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows:false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

  
    return(
      <div>
      
      <Slider {...settings} >
      {this.props.items ?
         this.props.items.map(item => (
        <div key={item._id}>
          <SliderItem
            navigateTo={this.navigateTo}
            selectedItem={this.props.selectedItem}
            selectedItemHandler={this.props.selectedItemHandler}
            item={item}/>
        </div>
         )) : null}         
      </Slider>
    </div>
    )
  }
}

export default withRouter(SliderSection);