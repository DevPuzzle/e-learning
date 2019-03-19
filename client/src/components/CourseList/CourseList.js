import React, { Component } from 'react'
import { withRouter } from 'react-router';
import axios from 'axios';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Spinner from '../UI/Spinner/Spinner';
import empty from '../../assets/images/safebox.png'
const styles = () => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  }
})


 class CourseList extends Component {

  state = {
    courseList: null
  }
  
  componentWillMount(){
    axios.post('http://owlunion.com/course/get/by/theme', {url:this.props.match.params.name})
    .then(response =>{
      this.setState({
        courseList: response.data.theme.course
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.name !== prevProps.match.params.name) {
      axios.post('http://owlunion.com/course/get/by/theme', {url:this.props.match.params.name})
    .then(response =>{
      this.setState({
        courseList: response.data.theme.course
      })
    })
    }
  }

  navigateTo = (url) => {
    this.props.history.push(`/course/${url}`)
  }

  render() {
    const { classes } = this.props;
    
    return (
      <section className='courses container py-5' style={{ minHeight: 'calc(100% - 144px)'}}>
        <div className='row'>
        {this.state.courseList && this.state.courseList.length < 1 
        ? <div style={{width: '100%', padding: '0 15px',}} className='d-flex flex-column align-items-center'>
            <div style={{maxWidth: '400px'}}><img style={{width: '100%'}}  src={empty} alt=""/></div>
            <h3 
              style={{
                fontWeight: 'bold',
                fontSize: '32px',
                marginTop: '10px',
                color: '#0277bd'}}>Sorry we cant find any course in this theme</h3>
          </div>
          : this.state.courseList ? 
          this.state.courseList.map(course => (
            <div 
              key={course._id}
              className='col-md-4' 
              onClick={() => this.navigateTo(course.url)}>
              <Card
                className={`${classes.card} mx-auto`}>
                <CardActionArea>
                  <CardMedia 
                    className={classes.media}
                    image={`http://owlunion.com/${course.image}`}/>
                  <CardContent
                  style={{
                    maxHeight: '100px',
                    minHeight: '100px'
                  }}>
                    <Typography gutterBottom variant="h5" component="h2" style={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden'
                    }}>
                    {course.name}
                    </Typography>
                    <Typography component="p" style={{textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden'}}>
                    {course.info}
                  </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
           
          ))  : <Spinner/>}
        </div>
      </section>
    )
  }
}






export default withRouter(withStyles(styles)(CourseList));