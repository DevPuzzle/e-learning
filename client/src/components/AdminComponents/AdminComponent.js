import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

import './AdminComponent.scss';
import * as actions from '../../actions/adminActions/categoriesActions';
import * as subCategoryActions from '../../actions/adminActions/subCategoriesActions';
import * as themeActions from '../../actions/adminActions/themesActions';
import { connect } from 'react-redux';
import AdminCategory from './AdminCategory/AdminCategory';
import AdminSubCategory from './AdminSubCategory/AdminSubCategory';
import AdminTheme from './AdminTheme/AdminTheme';


 class AdminComponent extends Component {

  state = {
    categoryEdit: null,
    subcategoryEdit: null,
    themeEdit: null
  }

  componentDidMount(){
    this.props.onGetCategories();
  }

  //CATEGORY STATE CHANGES
  
  editCategory = (id) => {
    this.setState({
      categoryEdit: id
    })
  }

  categorySubmit = (values) => {
    this.props.onUpdateCategory(values, values._id);
    this.setState({
      categoryEdit: null
    })
  }

  getSubCategoriesHandler = (id) => {
    this.props.onGetSubCategories(id);
    this.setState({
      themeEdit: null
    })
  }

  //SUBCATEGORY STATE CHANGES
  editSubcategory = (id) => {
    this.setState({
      subcategoryEdit: id
    })
  }

  subcategorySubmit = (values) => {
    this.props.onUpdateSubCategory(values, values._id)
    this.setState({
      subcategoryEdit: null
    })
  }

  getThemesHandler = (id) => {
    this.props.onGetThemes(id);
  }

  //THEME STATE CHANGES
  editTheme = (id) => {
    this.setState({
      themeEdit: id
    })
  }

  themeSubmit = (values) => {
    this.props.onUpdateTheme(values, values._id)
    this.setState({
      themeEdit: null
    })
  }
  
  
  render() {
    console.log('STATE',this.props)
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
            submit={this.categorySubmit}
            category={category}
            categoryEdit={this.editCategory}
            key={category._id}
            editState={this.state.categoryEdit}/>
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
                getThemes={this.getThemesHandler}
                subcategory={subcategory}
                submit={this.subcategorySubmit}
                subcategoryEdit={this.editSubcategory}
                editState={this.state.subcategoryEdit}/>
            )) : null }
            
        </div>
        <div className='col-md-4 courses__elementList'>
          <h3 className='courses__title'>
            Themes
          </h3>
            {this.props.themes ?
              this.props.themes.map(theme => (
                <AdminTheme
                  theme={theme}
                  key={theme._id}
                  submit={this.themeSubmit}
                  themeEdit={this.editTheme}
                  editState={this.state.themeEdit}/>
              )) : null}
        </div>
       
        </div>
         
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
    subcategories: state.subcategories.subcategories,
    themes: state.themes.themes
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCategories: () => dispatch(actions.getCategories()),
    onUpdateCategory: (values, categoryId) => dispatch(actions.updateCategory(values, categoryId)),
    onGetSubCategories: (categoryId) => dispatch(subCategoryActions.getSubCategories(categoryId)),
    onUpdateSubCategory: (values, subcategoryId) => dispatch(subCategoryActions.updateSubCategory(values, subcategoryId)),
    onGetThemes: (subcategoryId) => dispatch(themeActions.getThemes(subcategoryId)),
    onUpdateTheme: (values, themeId) => dispatch(themeActions.updateTheme(values,themeId))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)((AdminComponent));