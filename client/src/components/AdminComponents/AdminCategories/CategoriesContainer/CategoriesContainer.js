import React from 'react';
import Category from './Category/Category';
import AdminAddForm from '../../../UI/Templates/AdminAddForm/AdminAddForm';
import AddButton from '../../../UI/Buttons/AddButton';

const CategoriesContainer = (props) => {
  return (
    <React.Fragment>
      {props.categories ?
        props.categories.map(category =>(
          <Category 
            category={category}
            key={category._id}
            active={props.active}
            getSubCategories={props.getSubCategories}
            submit={props.submit}
            categoryEdit={props.categoryEdit}
            editState={props.editState}
            />
        )) : null}
      {props.addCategory ? 
        <AdminAddForm 
          form={props.form}
          onSubmit={props.submitAddCategory}
          />
        : <div className='courses__addContainer'>
            <AddButton
              adding={props.adding}
              className='courses__add'/>
          </div>}
    </React.Fragment>
  )
}

export default CategoriesContainer