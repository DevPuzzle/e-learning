import React, { Component } from 'react'
import './HomeContainer.scss';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import Login from '../../components/Login/Login';
import { Route, Link, Switch } from 'react-router-dom';

const Profile = () => <div>You're on the Profile Tab</div>;
const Comments = () => <div>You're on the Comments Tab</div>;
const Contact = () => <div>You're on the Contact Tab</div>;



const styles = theme => ({
  
  tabsRoot: {
    borderBottom: 'none',
  },
  tabsIndicator: {
    display: 'none'
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: '5px',
    fontSize: '12px',
    opacity: 0.2,
   
    '&:hover': {
      color: '#fff',
      opacity: 0.8,
    },
    '&$tabSelected': {
      color: '#fff',
      opacity: 0.8,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#fff',
      opacity: 0.8,
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
});




 class HomeContainer extends Component {

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };


  render() {

    const { value } = this.state;
    const { classes } = this.props;

    return (
      <section className='home'>       
        <div className='home__banner'>

        <div className='wrapper'>   
          <div className='home__content'>
          <h1 className='home__title'>
            You can learn anything
          </h1> 
          <h3 className='home__subTitle'>
            For free. For everyone. Forever
          </h3>
          <Link to={'/'}>Info</Link>
          <Link to={'/home/login'}>Login</Link>
          <Link to={'/home/contact'}>Contact</Link>
          <div className="tabs">
  <Switch>
    <Route path={`/home`} exact component={Profile} />
    <Route path={`/home/login`} component={Login} />
    <Route path={`/home/contact`} component={Contact} />
  </Switch>
</div>
          {/* <div className='home__tabsCont'>    
          <Tabs
          className='home__tabs'
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            id='TABTABTAB'
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<i className="fas fa-info"></i>}
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<i className="fas fa-lock"></i>}
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<i className="fas fa-user-plus"></i>}
          />
        </Tabs> 
        <div className='home__tabContainer'>
        {value === 0 && 
          <React.Fragment>
          <Button 
          className='home__btn'
          variant="contained" 
          color="primary" >
            Sign up for a course
          </Button> 
          <Button 
          className='home__btn'
          variant="contained" 
          color="primary" >
            Subscribe to school
          </Button>     
          <Button 
          className='home__btn'
          variant="contained" 
          color="primary" >
            Become a teacher
          </Button>  
          <Button 
          className='home__btn'
          variant="contained" 
          color="primary" >
            Create a school
          </Button>  
          </React.Fragment>
          }
          {value === 1 && <Login />}
          </div>
        </div> */}
       
      
          </div>
          </div>
          
        </div>
      </section>
    )
  }
}

export default withStyles(styles)(HomeContainer);