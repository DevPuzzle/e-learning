import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getCourseList } from '../../actions/courseListActions';

 class CourseList extends Component {
  
  componentWillMount(){
    console.log(this.props)
    this.props.onGetCourseList(this.props)
  }
  
  render() {
    return (
      <div>
        123123
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    courseList: state.courseList.courseList
  }
}

const mapDispatchToProps = dispatch => {
  return {
     onGetCourseList: (id) => dispatch(getCourseList(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseList));