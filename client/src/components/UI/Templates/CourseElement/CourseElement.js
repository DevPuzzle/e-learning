import React from 'react';
import './CourseElement.scss';

 const CourseElement = (props) => {
  console.log(props)
  return (
    <section className='courseEl'>
      <div className='courseEl__background'>
        <div className='container'>
          <div className='row'>
            <div className='courseEl__content'>
              <div className='courseEl__mainContent'>
                <h3 className='courseEl__title'>
                  JavaScript Algorithms and Data Structures Masterclass
                </h3>
                <h4 className='courseEl__info'>
                  The Missing Computer Science and Coding Interview Bootcamp
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='courseEl__descriptionContent'>
        CONTENT
        <div>
          
        </div>
      </div>
    </section>
  )
}

export default CourseElement;