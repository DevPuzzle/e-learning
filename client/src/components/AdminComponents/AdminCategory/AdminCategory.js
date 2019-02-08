import React from 'react';
import Typography from '@material-ui/core/Typography';
import AdminCategoryEdit from '../AdminCategoryEdit/AdminCategoryEdit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

 const AdminCategory = (props) => {
  return (
    <Card className='courses__cardCont'>
    <CardContent>
    {props.editState !== props.category._id ?
    <div className='courses__card'>
    <div className='courses__cont'>
    <h3 className='courses__name'>
    {props.category.name}
    </h3>         
    <div className='courses__pannel'>
      <div className='courses__icon' onClick={() => props.onEdit(props.category._id)}>
        <i className="fas fa-marker"></i>
      </div>
      <div className='courses__icon'>
      <i className="fas fa-trash-alt"></i>
      </div>
    </div>
    </div>
    <Typography>
       {props.category.description}
    </Typography>
    </div>
    : <AdminCategoryEdit onSubmit={props.submit} form={props.category.name} initialValues={props.category}/>
    }
      
    </CardContent>
    </Card>
  )
}

export default AdminCategory;


