import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AdminEditForm from '../../UI/Templates/AdminEditForm/AdminEditForm';

 const AdminTheme = (props) => {
   console.log(props)
  return (
    <Card className='courses__cardCont'>
    <CardContent>
      {props.editState !== props.theme._id ?
        <div className='courses__card'>
        <div className='courses__cont'>
          <h3 className='courses__name'>
            {props.theme.name}
          </h3>
          <div className='courses__pannel'>
            <div className='courses__icon' onClick={() => props.themeEdit(props.theme._id)}>
              <i className="fas fa-marker"></i>
            </div>
            <div className='courses__icon' onClick={() => props.openDeleteModalHandler(props.theme._id)}>
              <i className="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
        <Typography>
          {props.theme.description}
        </Typography>
        </div>
        : <AdminEditForm onSubmit={props.submit} form={props.theme.name} initialValues={props.theme}/>

      }
    

      
    </CardContent>
    </Card>
  )
}
export default AdminTheme;