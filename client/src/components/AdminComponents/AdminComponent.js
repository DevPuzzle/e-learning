import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './AdminComponent.scss';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});


 class AdminComponent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className='row courses'>
        <div className='col-md-4 courses__elementList'>
          <h3 className='courses__title'>
            Categories
          </h3>
        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          Category 1 
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
        </div>
        <div className='col-md-4 courses__elementList'>
          <h3 className='courses__title'>
            Sub Categories
          </h3>
            Sub Categories
        </div>
        <div className='col-md-4 courses__elementList'>
          <h3 className='courses__title'>
            Themes
          </h3>
            Themes
        </div>
       
        </div>
         
      </div>
    )
  }
}

export default withStyles(styles)(AdminComponent);