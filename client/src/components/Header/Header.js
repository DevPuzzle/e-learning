import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink, Link, withRouter } from 'react-router-dom';
import './Header.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import * as actions from '../../actions/loginActions';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core';
import { getUserData } from '../../actions/profileActions';


const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(225, 245, 254, 1)',
    '&:hover': {
      backgroundColor: 'rgba(225, 245, 254, 0.7)',
    },
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
});

class Header extends Component {
  state = {
    anchorEl: null,
    coursesEl: null,
    schoolsEl: null,
    left: false
  }

  componentDidMount(){
    if(this.props.auth){
      this.props.onGetUserData()
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  schoolsOpen = event => {
    this.setState({ coursesEl: event.currentTarget });
  };
  schoolsClose = () => {
    this.setState({ coursesEl: null });
  };

 coursesOpen = event => {
    this.setState({ coursesEl: event.currentTarget });
  };
  coursesClose = () => {
    this.setState({ coursesEl: null });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.handleClose();
    this.props.onLogout();
    this.props.history.push('/');
  }

  render(){
    const { anchorEl, coursesEl, schoolsEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    const sideList = (
        <List className='drawer'>
          <ListItem className='drawer__link' component={Link} to='/courses' button>
            <i className="fas fa-book"></i> Courses
          </ListItem>
          <ListItem className='drawer__link' component={Link} to='/schools' button>
            <i className="fas fa-graduation-cap"></i> Schools
          </ListItem>
          {!this.props.auth ?
          <React.Fragment>
          <Divider />
          <ListItem className='drawer__link' component={Link} to='/login' button>
            <i className="fas fa-lock"></i> Login
          </ListItem>
          <ListItem className='drawer__link' component={Link} to='/signUp' button>
            <i className="fas fa-user-plus"></i> Sign Up
          </ListItem>
          </React.Fragment>
          :
          <React.Fragment>
          <Divider />
          <ListItem component={Link} to='/profile' className='drawer__link' button>
            <i className="fas fa-user-cog"></i> Profile
          </ListItem>
          <ListItem className='drawer__link' onClick={this.logout} button>
            <i className="fas fa-sign-out-alt"></i> Logout
          </ListItem>
          </React.Fragment>
          }
        </List>
    );

    const avatar = () => {
      if(this.props.profile.avatar && this.props.profile.avatar.userImage){
        return <img className='header__profileImage' src={`http://localhost:5000/${this.props.profile.avatar.userImage}`}/>
      }else if(!this.props.profile.avatar && this.props.profile.userData && this.props.profile.userData.userImage){
        return <img className='header__profileImage' src={`http://localhost:5000/${this.props.profile.userData.userImage}`} />;
      }else {
        return <i className="fas fa-user-circle header__usericon"></i>
      }
    }

  return(   
    <AppBar 
      color='default'>
      <div className='container'>
      <div className='row'>
      <Toolbar className='header'>
      <div className='header__left'>
      {/* SIDE DRAWER */}
      <div className='header__responseDrawer'>
      <IconButton onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
      <div
        tabIndex={0}
        role="button"
        onClick={this.toggleDrawer('left', false)}
        onKeyDown={this.toggleDrawer('left', false)}>
          {sideList}
      </div>
        </Drawer>
      </div>
      <div className='header__logo'>
          <NavLink to='/'><p>eLearning</p></NavLink>
        </div>
        <nav className='header__nav'>
          <div className='header__courses'>
          <p 
            aria-owns={coursesEl ? 'courses-menu' : undefined}
            aria-haspopup="true"
            onClick={this.coursesOpen}>
            Courses
          </p>
          <Menu
          id="courses-menu"
          anchorEl={coursesEl}
          open={Boolean(coursesEl)}
          onClose={this.coursesClose}>
          <MenuItem onClick={this.coursesClose}>All courses</MenuItem>
          <MenuItem onClick={this.coursesClose}>Not all courses</MenuItem>
        </Menu>
          </div>
          <div className='header__schools'>
          <p 
            aria-owns={coursesEl ? 'schools-menu' : undefined}
            aria-haspopup="true"
            onClick={this.schoolsOpen}>
            Schools
          </p>
          <Menu
          id="schools-menu"
          anchorEl={schoolsEl}
          open={Boolean(schoolsEl)}
          onClose={this.schoolsClose}>
          <MenuItem onClick={this.schoolsClose}>All schools</MenuItem>
          <MenuItem onClick={this.schoolsClose}>Not all schools</MenuItem>
        </Menu>
          </div>
        </nav>
        <div className={classes.grow} />
        <div className={`${classes.search} header__search`}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
      </div>
        <div className='header__log'>
        {!this.props.auth ? 
        <React.Fragment>
        <NavLink to='/login'>
            LogIn
          </NavLink>
          <NavLink to='/signup'>
            SignUp
          </NavLink> 
          </React.Fragment>
          : 
          <React.Fragment>
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit">
            {avatar()}
          </IconButton>
          <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(open)}
          onClose={this.handleClose}>
          <NavLink onClick={this.handleClose} className='header__dropnav' to='/myCourses'><MenuItem >My Courses</MenuItem></NavLink>
          <NavLink onClick={this.handleClose} className='header__dropnav' to='/mySchool'><MenuItem >My School</MenuItem></NavLink>
          <NavLink onClick={this.handleClose} className='header__dropnav' to='/profile'><MenuItem ><span><i className="fas fa-user-cog"></i></span>Profile</MenuItem></NavLink>
          {this.props.login.role === 'admin' ?
            <NavLink onClick={this.handleClose} className='header__dropnav' to='/admin'><MenuItem><span><i className="fas fa-cog"></i></span>Admin Area</MenuItem></NavLink> : null}
          <button onClick={this.logout} className='header__dropnav'><MenuItem ><span><i className="fas fa-sign-out-alt"></i></span>Logout</MenuItem></button>
        </Menu>
        </React.Fragment>}
        </div>
      </Toolbar>
      </div>
      </div>
    </AppBar>
  )
} 
}

const mapStateToProps = (state) => {
  return {
    auth: state.login.token,
    login: state.login,
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
    onGetUserData: () => dispatch(getUserData())
    }
  }



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));