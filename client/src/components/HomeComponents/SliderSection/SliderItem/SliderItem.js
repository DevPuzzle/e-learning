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
      enterDelay={250}
      leaveDelay={250}
      placement='right'
      style={{opacity: '1 !important'}}
      title={<SliderItemDescription />} 
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
          image="https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
          }}>
            React course complete 10 hours
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
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