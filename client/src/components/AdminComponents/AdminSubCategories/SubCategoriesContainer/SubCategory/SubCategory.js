import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AdminEditForm from '../../../../UI/Templates/AdminEditForm/AdminEditForm';

 const AdminSubCategory = (props) => {
  return (
    <Card className='courses__cardCont'>
    <CardContent>
      {props.editState !== props.subcategory._id ?
        <div className='courses__card'>
        <div className='courses__cont'>
          <h3 className={props.active === props.subcategory._id ? 'courses__name activeName' : 'courses__name'} onClick={() => props.getThemes(props.subcategory._id)}>
            {props.subcategory.name}
          </h3>
          <div className='courses__pannel'>
            <div className='courses__icon' onClick={() => props.subcategoryEdit(props.subcategory._id)}>
              <i className="fas fa-marker"></i>
            </div>
            {/* delete button */}
            <div className='courses__icon' onClick={() => props.deleteSubcategory(props.subcategory._id)}>
              <i className="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
        <Typography>
          {props.subcategory.description}
        </Typography>
        </div>
        : <AdminEditForm onSubmit={props.submit} form={props.subcategory.name} initialValues={props.subcategory}/>

      }
    

      
    </CardContent>
    </Card>
  )
}
export default AdminSubCategory;