import React, { Component } from 'react';
import { getSchoolCollection, deleteSchoolCollection } from '../../../actions/schoolCoverActions';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    background: '#0277bd',
    color: '#fff',
    '&:hover': {
      background: '#039be5'
    }
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
    card: {
      maxWidth: 345,
      height: '100%'
    },
    media: {
      height: 140,
    }
});



class MySchoolsCollection extends Component {
  
  componentWillMount(){
    this.props.onGetSchoolCollection()
  }

  deleteSchoolCollectionHandler = (id) => {
    this.props.onDeleteSchoolCollection(id)
  }

  render(){
    return (
      <React.Fragment>
        {this.props.schoolCollection ? this.props.schoolCollection.map(school => (
          <div className='col-md-3' key={school._id}>
          {console.log(school)}
        <Card
          className={this.props.classes.card}>
        <CardActionArea>
        <CardMedia
          className={this.props.classes.media}
          image={`http://localhost:5000/${school.image}`}
          title={school.name}/>
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
                {school.name}
            </Typography>
             <Typography 
              style={{
                color: 'rgba(0, 0, 0, 0.54)'
              }}
              component="p">
              {`${school.city} ${school.state}`}
            </Typography> 
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button 
            onClick={() => this.deleteSchoolCollectionHandler(school._id)}
            className='instructorForm__deleteBtn'
            size='small'>
            Delete
          </Button>
        </CardActions>
      </Card>
        </div>
        )) : null}
        
      </React.Fragment>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    schoolCollection: state.schoolCollectionReducer.schoolCollection
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSchoolCollection: () => dispatch(getSchoolCollection()),
    onDeleteSchoolCollection: (id) => dispatch(deleteSchoolCollection(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MySchoolsCollection));