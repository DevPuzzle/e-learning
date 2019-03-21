import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SliderItemDescription from '../SliderItemDescription/SliderItemDescription';
import { Tooltip } from '@material-ui/core';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  }, 
  htmlTooltip: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 1)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    '& b': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  popper: {
    opacity: 1
  }
});



const SliderItem = (props) => {
  const { classes } = props;
  return (
    <Tooltip 
      onMouseEnter={() => props.selectedItemHandler(props.item)}
      enterDelay={300}
      leaveDelay={100}
      onClick={() => props.navigateTo(props.item)}
      placement='right'
      style={{opacity: '1 !important'}}
      title={<SliderItemDescription navigateTo={props.navigateTo} selectedItem={props.item}/>} 
      classes={{
        popper: classes.popper,
        tooltip: classes.htmlTooltip,
      }} 
      interactive>
    <Card 
      className={classes.card} 
      style={{margin: '10px'}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${window.location.origin}/api/${props.item.image}`}
        />
        <CardContent style={{
          maxHeight: '100px',
          minHeight: '100px'
        }}>
          <Typography gutterBottom variant="h5" component="h2" style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
          }}>
            {props.item.name}
          </Typography>
          <Typography component="p" style={{textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'}}>
            {props.item.info}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Tooltip>
  );
}


SliderItem.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SliderItem);