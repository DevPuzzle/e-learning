import React from 'react';
import SubCategory from './SubCategory/SubCategory';
import AdminAddForm from '../../../UI/Templates/AdminAddForm/AdminAddForm';
import AddButton from '../../../UI/Buttons/AddButton';
import AdminDeleteModal from '../../../UI/Templates/AdminDeleteModal/AdminDeleteModal';

const SubCategoriesContainer = (props) => {
  return (
    <React.Fragment>
      {props.subcategories ? 
        props.subcategories.map(subcategory => (
          <SubCategory 
            openDeleteModalHandler={props.openDeleteModalHandler}
            deleteSubcategory={props.deleteSubcategory}
            key={subcategory._id}
            active={props.active}
            getThemes={props.getThemes}
            subcategory={subcategory}
            submit={props.submit}
            subcategoryEdit={props.subcategoryEdit}
            editState={props.editState}
            />
        ))
        : null}
        {props.subcategories ?
          props.addSubCategory ?
            <AdminAddForm 
              form={props.form}
              onSubmit={props.submitAddSubCategory}
              />
            : <div className='courses__addContainer'>
                <AddButton 
                  adding={props.adding}
                  className='courses__add'
                  />
              </div>
              : <h3>Choose category</h3>}
              <AdminDeleteModal   
                openDeleteModalHandler={props.openDeleteModalHandler}             
                closeDeleteModalHandler={props.closeDeleteModalHandler}
                openDeleteModal={props.openDeleteModal}
                delete={props.deleteSubcategory}/>
    </React.Fragment>
  )
}

export default SubCategoriesContainer;