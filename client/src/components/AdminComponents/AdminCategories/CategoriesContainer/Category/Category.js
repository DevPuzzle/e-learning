import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AdminEditForm from '../../../../UI/Templates/AdminEditForm/AdminEditForm';

 const Category = (props) => {
  return (
    <Card className='courses__cardCont'>
    <CardContent>
    {props.editState !== props.category._id ?
    <div className='courses__card'>
    <div className='courses__cont'>
      <h3 className={props.active === props.category._id ? 'courses__name activeName' : 'courses__name' } onClick={() => props.getSubCategories(props.category._id)}>
        {props.category.name}
      </h3>         
    <div className='courses__pannel'>
      <div className={'courses__icon'} onClick={() => props.categoryEdit(props.category._id)}>
        <i className="fas fa-marker"></i>
      </div>
      {/* button delete */}
      <div className='courses__icon' onClick={() => props.openDeleteModalHandler(props.category._id)}>
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>
    </div>
    <Typography>
       {props.category.description}
    </Typography>
    </div>
    : <AdminEditForm onSubmit={props.submit} form={props.category.name} initialValues={props.category}/>
    }
      
    </CardContent>
    </Card>
  )
}

export default Category;
