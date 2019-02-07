import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

import './AdminComponent.scss';
import * as actions from '../../actions/adminActions/categoriesActions';
import { connect } from 'react-redux';
import AdminCategory from './AdminCategory/AdminCategory';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});


 class AdminComponent extends Component {

  state = {
    onEdit: null
  }

  componentWillMount(){
    this.props.onGetCategories();
  }

  editCategory = (id) => {
    console.log(id)
    this.setState({
      onEdit: id
    })
  }

  submit = (values) => {
    this.setState({
      onEdit: null
    })
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className='row courses'>
        <div className='col-md-4 courses__elementList'>
          <h3 className='courses__title'>
            Categories
          </h3>
          {this.props.categories ? 
          this.props.categories.doc.map(category => (
          <AdminCategory 
            submit={this.submit}
            category={category}
            onEdit={this.editCategory}
            key={category._id}
            editState={this.state.onEdit}/>
          )) : null }
        
        </div>
        <div className='col-md-4 courses__elementList'>
          <h3 className='courses__title'>
            Sub Categories
          </h3>
            Sub Categories
        </div>
        <div className='col-md-4 courses__elementList'>
          <h3 className='courses__title'>
            Themes
          </h3>
            Themes
        </div>
       
        </div>
         
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCategories: () => dispatch(actions.getCategories())
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminComponent));