import React, { Component } from 'react';
import { getSchoolCollection, deleteSchoolCollection } from '../../../actions/schoolCoverActions';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteModal from '../../UI/Templates/DeleteModal/DeleteModal';
import Spinner from '../../UI/Spinner/Spinner';

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

  state = {
    itemToDelete: null,
    showDelete: false
  }
  
  componentWillMount(){
    this.props.onGetSchoolCollection()
  }

  showDeleteModal = (id) => {
    this.setState({
      itemToDelete: id,
      showDelete: true
    })
  }

  deleteSchoolCollectionHandler = () => {
    this.props.onDeleteSchoolCollection(this.state.itemToDelete);
    this.setState({
      itemToDeleteL: null,
      showDelete: false
    })
  }

  closeDeleteModal = () => {
    this.setState({
      itemToDelete: null,
      showDelete: false
    })
  }

  render(){
    
    return (
      <React.Fragment>
        {this.props.loading ?
          <Spinner />
          :
          this.props.schoolCollection ? this.props.schoolCollection.map(school => (
          <div className='col-md-3 mb-4 ' key={school._id}>
        <Card
          className={`${this.props.classes.card} mx-auto`}>
        <CardActionArea>
        <CardMedia
          className={this.props.classes.media}
          image={`${window.location.origin}/api/${school.image}`}
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
                color: 'rgba(0, 0, 0, 0.54)',
                fontSize: '18px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
              component="p">
              {`${school.city} ${school.state}`}
            </Typography> 
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button 
            onClick={() => this.showDeleteModal(school._id)}
            className='instructorForm__deleteBtn'
            size='small'>
            Delete
          </Button>
        </CardActions>
      </Card>
        </div>
        )) : null}
        <DeleteModal 
          item={this.state.itemToDelete}
          open={this.state.showDelete}
          handleClose={this.closeDeleteModal}
          delete={this.deleteSchoolCollectionHandler}/>
      </React.Fragment>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    schoolCollection: state.schoolCollectionReducer.schoolCollection,
    loading: state.schoolCollectionReducer.loading,
    error: state.schoolCollectionReducer.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSchoolCollection: () => dispatch(getSchoolCollection()),
    onDeleteSchoolCollection: (id) => dispatch(deleteSchoolCollection(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MySchoolsCollection));