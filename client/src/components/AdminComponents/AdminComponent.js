import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

import './AdminComponent.scss';
import * as actions from '../../actions/adminActions/categoriesActions';
import * as subCategoryActions from '../../actions/adminActions/subCategoriesActions';
import { connect } from 'react-redux';
import AdminCategory from './AdminCategory/AdminCategory';
import AdminSubCategory from './AdminSubCategory/AdminSubCategory';


 class AdminComponent extends Component {

  state = {
    onEdit: null
  }

  componentDidMount(){
    this.props.onGetCategories();
  }

 
  
  editCategory = (id) => {
    this.setState({
      onEdit: id
    })
  }

  submit = (values) => {
    this.props.onUpdateCategory(values, values._id);
    this.setState({
      onEdit: null
    })
  }

  getSubCategoriesHandler = (id) => {
    this.props.onGetSubCategories(id);
  }
  
  render() {
    return (
      <div >
        <div className='row courses'>
        <div className='col-md-4 courses__elementList'>
          <h3 className='courses__title'>
            Categories
          </h3>
          {this.props.categories ? 
          this.props.categories.map(category => (
          <AdminCategory 
            getSubCategories={this.getSubCategoriesHandler}
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
          {this.props.subcategories ?
            this.props.subcategories.map(subcategory => (
              <AdminSubCategory 
                key={subcategory._id}
                subcategory={subcategory}/>
            )) : null }
            
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
    categories: state.categories.categories,
    subcategories: state.subcategories.subcategories
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCategories: () => dispatch(actions.getCategories()),
    onUpdateCategory: (values, categoryName) => dispatch(actions.updateCategory(values, categoryName)),
    onGetSubCategories: (categoryId) => dispatch(subCategoryActions.getSubCategories(categoryId))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)((AdminComponent));