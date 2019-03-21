import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Spinner from '../UI/Spinner/Spinner';
import empty from '../../assets/images/safebox.png';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const styles = (theme) => ({
  card: {     
    maxWidth: 345,
    height: '100%'
  },
  media: {
    height: 140,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(225, 245, 254, 1)',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    color: '#01579b',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: ''
  },
  inputRoot: {
    color: '#01579b',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
})

class SchoolList extends Component {
  state = {
    schoolList: null,
    filteredSchools: ''
  }

componentWillMount(){
  axios.get(`${window.location.origin}/api/school/list`)
  .then(res => {
    this.setState({
      schoolList: res.data.schoolList,
      filteredSchools: res.data.schoolList
    })
  })
}

filter = (e) => {
  let filteredSchools = this.state.schoolList;
  filteredSchools = filteredSchools.filter((school) => {
    let cityName = school.city.toLowerCase();
    return cityName.indexOf(
      e.target.value.toLowerCase()) !== -1
  })
  this.setState({
    filteredSchools
  }) 
  
}

navigateTo = (url) => {
  this.props.history.push(`/school/${url}`)
}

render() {
  const { classes } = this.props;
  return (
    <React.Fragment>
    <div className="searchContainer" style={{
      background: '#0277bd',
      padding: '40px 15px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div className={`${classes.search} header__search`}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={this.filter}
          placeholder="Filter by city"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    </div>
    <section className='schools container py-5' style={{ minHeight: 'calc(100% - 144px)'}}>
        <div className='row'>
        {this.state.filteredSchools && this.state.filteredSchools.length < 1 
        ? <div style={{width: '100%', padding: '0 15px',}} className='d-flex flex-column align-items-center'>
            <div style={{maxWidth: '400px'}}><img style={{width: '100%'}}  src={empty} alt=""/></div>
            <h3 
              style={{
                fontWeight: 'bold',
                fontSize: '32px',
                marginTop: '10px',
                color: '#0277bd'}}>Sorry we cant find any school</h3>
          </div>
          : this.state.filteredSchools ? 
          this.state.filteredSchools.map(school => (
            <div 
              key={school._id}
              className='col-md-4 mb-4' 
              onClick={() => this.navigateTo(school.url)}>
              <Card
                className={`${classes.card} mx-auto`}>
                <CardActionArea>
                  <CardMedia 
                    className={classes.media}
                    image={`/${school.image}`}
                    title={school.name}/>
                  <CardContent>
                    <Typography 
                      gutterBottom 
                      component="h2"
                      style={{
                        fontSize: '18px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden'
                      }}>
                        {school.name}
                    </Typography>
                    <Typography 
                      style={{
                        color: 'rgba(0, 0, 0, 0.54)'
                      }}
                      component="p">
                      {`${school.city}, ${school.state}`}
                    </Typography> 
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
           
          ))  : <Spinner/>}
        </div>
      </section>
    </React.Fragment>
    )
  }

}

export default withRouter(withStyles(styles)(SchoolList));
