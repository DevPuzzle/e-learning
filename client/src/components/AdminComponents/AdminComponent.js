import React, { Component } from 'react'
import './AdminComponent.scss';
import * as actions from '../../actions/adminActions/categoriesActions';
import * as categoryActions from '../../actions/adminActions/categoriesActions';
import * as subCategoryActions from '../../actions/adminActions/subCategoriesActions';
import * as themeActions from '../../actions/adminActions/themesActions';
import { connect } from 'react-redux';
import AdminTheme from './AdminTheme/AdminTheme';
import SubCategoriesContainer from './AdminSubCategories/SubCategoriesContainer/SubCategoryContainer';
import CategoriesContainer from './AdminCategories/CategoriesContainer/CategoriesContainer';
import AdminAddForm from '../UI/Templates/AdminAddForm/AdminAddForm';
import AddButton from '../UI/Buttons/AddButton';


 class AdminComponent extends Component {

  state = {
    categoryEdit: null,
    subcategoryEdit: null,
    themeEdit: null,
    addCategory: false,
    addSubCategory: false,
    activeCategory: 0,
    activeSubCategory: 0
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
      themeEdit: null,
      activeCategory: id,
      activeSubCategory: 0
    })
  }

  addCategoryHandler = () => {
    this.setState({
      addCategory: true
    })
  }
  submitAddCategory = (values) => {
   this.props.onAddCategory(values);
    this.setState({
      addCategory:false
    })
  }

  //SUBCATEGORY STATE CHANGES
  editSubcategory = (id) => {
    this.setState({
      subcategoryEdit: id
    })
  }

  // delete category
  deleteCategory = (id) => {
    console.log(id)
    this.props.onDeleteCategory(id)
  } 

  // delete subcategory
  deleteSubcategory = (id) => {
    console.log(id)
    this.props.onDeleteSubcategory(id)
  }

  subcategorySubmit = (values) => {
    this.props.onUpdateSubCategory(values, values._id)
    this.setState({
      subcategoryEdit: null
    })
  }

  getThemesHandler = (id) => {
    this.props.onGetThemes(id);
    this.setState({
      activeSubCategory: id
    })
  }
  
  addSubCategoryHandler = () => {
    this.setState({
      addSubCategory: true
    })
  }
  submitAddSubCategory = (values) => {
    this.props.onAddSubCategory(values, this.state.activeCategory)
    this.setState({
      addSubCategory: false
    })
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

  submitAddTheme = (values) => {
    this.props.onAddTheme(values, this.state.activeSubCategory)
    this.setState({
      addTheme: false
    })
  }

  addThemeHandler = () => {
    this.setState({
      addTheme: true
    })
  }

  deleteTheme = (id) => {
    console.log(id)
    this.props.onDeleteTheme(id)
  } 

  
  render() {
    return (
        <div className='row courses'>
        <div className='col-md-4 courses__elementList'>
          <h3 className='courses__title'>
            Categories
          </h3>
          <CategoriesContainer 
            deleteCategory={this.deleteCategory}
            categories={this.props.categories}
            active={this.state.activeCategory}
            getSubCategories={this.getSubCategoriesHandler}
            submit={this.categorySubmit}
            editState={this.state.categoryEdit}
            form='addCategory'
            categoryEdit={this.editCategory}
            submitAddCategory={this.submitAddCategory}
            adding={this.addCategoryHandler}
            addCategory={this.state.addCategory}/>
        
        </div>
        <div className='col-md-4 courses__elementList'>
          <h3 className='courses__title'>
            Sub Categories
          </h3>
          <SubCategoriesContainer 
            subcategories={this.props.subcategories}
            active={this.state.activeSubCategory}
            getThemes={this.getThemesHandler}
            submit={this.subcategorySubmit}
            subcategoryEdit={this.editSubcategory}
            editState={this.state.subcategoryEdit}
            form='addSubCategory'
            addSubCategory={this.state.addSubCategory}
            submitAddSubCategory={this.submitAddSubCategory}
            adding={this.addSubCategoryHandler}
            deleteSubcategory={this.deleteSubcategory}
            />
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
                  editState={this.state.themeEdit}
                  deleteTheme={this.deleteTheme}
                  />
              )) : null}
            {this.props.themes ?
              this.state.addTheme ?
                <AdminAddForm 
                  form='addTheme'
                  onSubmit={this.submitAddTheme}
                  />
                : <div className='courses__addContainer'>
                    <AddButton 
                      adding={this.addThemeHandler}
                      className='courses__add'/>          
                  </div>
                  : <h3>Choose Theme</h3>}
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
    onAddCategory: (values) => dispatch(actions.addCategory(values)),
    onGetSubCategories: (categoryId) => dispatch(subCategoryActions.getSubCategories(categoryId)),
    onUpdateSubCategory: (values, subcategoryId) => dispatch(subCategoryActions.updateSubCategory(values, subcategoryId)),
    onAddSubCategory: (values, categoryId) => dispatch(subCategoryActions.addSubcategory(values, categoryId)),
    onGetThemes: (subcategoryId) => dispatch(themeActions.getThemes(subcategoryId)),
    onUpdateTheme: (values, themeId) => dispatch(themeActions.updateTheme(values,themeId)),
    onAddTheme: (values, subcategoryId) => dispatch(themeActions.addTheme(values, subcategoryId)),
    onDeleteTheme: (id) => dispatch(themeActions.deleteTheme(id)),
    onDeleteSubcategory: (id) => dispatch(subCategoryActions.deleteSubcategory(id)),
    onDeleteCategory: (id) => dispatch(categoryActions.deleteCategory(id))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)((AdminComponent));