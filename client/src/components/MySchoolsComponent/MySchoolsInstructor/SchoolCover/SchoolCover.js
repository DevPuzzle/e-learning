import React, { Component } from 'react';
import {
  Card,
  CardActionArea, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button
} from '@material-ui/core';

const SchoolCover = (props) => {
  return (
    <div 
      className='col-md-3 mb-4'>
      <Card
        className={props.classes.card}>
        <CardActionArea>
          <CardMedia 
            className={props.classes.media}
            image={`http://localhost:5000/${props.schoolCover.image}`}
            title={props.schoolCover.name}/>
            <CardContent>
              <Typography
                gutterBottom
                component='h2'
                style={{
                  fontSize: '18px',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }}>
                {props.schoolCover.name}
              </Typography>
              <Typography 
              style={{
                color: 'rgba(0, 0, 0, 0.54)',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
              component="p">
              {`${props.schoolCover.city}, ${props.schoolCover.state}`}
            </Typography> 
            </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            className='instructorForm__editBtn'
            onClick={() => props.editSchoolCover(props.schoolCover)}>
            Edit
          </Button>
          <Button
            size='small'
            className='instructorForm__deleteBtn'
            onClick={() => props.deleteSchoolCover(props.schoolCover._id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default SchoolCover;