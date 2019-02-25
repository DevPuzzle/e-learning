import React from 'react';
import {  Card, 
          CardActionArea, 
          CardMedia, 
          CardContent, 
          Typography, 
          CardActions, 
          Button } from '@material-ui/core';

const CourseCover = (props) => {
  return (
    <div 
      className='col-md-3 mb-4'>
      <Card 
        className={props.classes.card}>
        <CardActionArea>
        <CardMedia
          className={props.classes.media}
          image={`http://localhost:5000/${props.course.image}`}
          title={props.course.name}/>
          <CardContent>
            <Typography 
              gutterBottom 
              component="h2"
              style={{
                fontSize: '18px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}>
                {props.course.name}
            </Typography>
            {/* <Typography 
              component="p">
            </Typography>  */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button 
            onClick={() => props.editCourseCover(props.course)}
            className='instructorForm__editBtn'
            size='small'>
            Edit
          </Button>
          <Button 
            className='instructorForm__deleteBtn'
            onClick={() => props.openConfirmDialog(props.course._id)}
            size='small'>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default CourseCover;