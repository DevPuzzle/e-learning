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
  console.log(props)
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
                color: 'rgba(0, 0, 0, 0.54)'
              }}
              component="p">
              {`${props.schoolCover.info}`}
            </Typography> 
            </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size='small'>
            Edit
          </Button>
          <Button
            size='small'>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default SchoolCover;