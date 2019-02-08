import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

 const AdminSubCategory = (props) => {
  return (
    <Card className='courses__cardCont'>
    <CardContent>
      <h3 className='courses__name'>
        {props.subcategory.name}
      </h3>
      
    </CardContent>
    </Card>
  )
}
export default AdminSubCategory;