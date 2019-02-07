import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AdminCategoryEdit from '../AdminCategoryEdit/AdminCategoryEdit';


 const AdminCategory = (props) => {
  return (
    <ExpansionPanel >
    <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />}>
    {props.editState !== props.category._id ?
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
    : <AdminCategoryEdit onSubmit={props.submit} form={props.category.name} initialValues={props.category}/>
    }
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography>
       {props.category.description}
      </Typography>
    </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default AdminCategory;


