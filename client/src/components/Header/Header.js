import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink, withRouter } from 'react-router-dom';
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

class Header extends Component {

  state = {
    anchorEl: null,
    coursesEl: null,
    schoolsEl: null,
    left: false
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
    this.props.onLogout();
    this.props.history.push('/home/login');
  }




  render(){
    const { anchorEl, coursesEl, schoolsEl } = this.state;
    const open = Boolean(anchorEl);

    const sideList = (
      <div>
        <List>
            <ListItem button>
              <NavLink to='/courses'>Courses</NavLink>
            </ListItem>
            <ListItem button>
              <NavLink to='/schools'>Schools</NavLink>
            </ListItem>
        <Divider />
            <ListItem button>
              <NavLink to='/myschools'>My Schools</NavLink>
            </ListItem>
            <ListItem button>
              <NavLink to='/mycourses'>My Courses</NavLink>
            </ListItem>

        <Divider />
            <ListItem button>
              <NavLink to='/profile'>Profile</NavLink>
            </ListItem>
         
        </List>
        
      </div>
    );


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
            onKeyDown={this.toggleDrawer('left', false)}
          >
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
          onClose={this.coursesClose}
        >
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
          onClose={this.schoolsClose}
        >
          <MenuItem onClick={this.schoolsClose}>All schools</MenuItem>
          <MenuItem onClick={this.schoolsClose}>Not all schools</MenuItem>
        </Menu>

          </div>
          
        </nav>
        <div className='header__search'>
              <div className='header__searchIcon'>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: 'header__inputRoot',
                  input: 'header__inputInput',
                }}
              />
            </div>
      </div>
        <div className='header__log'>
        {!this.props.auth ? 
        <React.Fragment>
        <NavLink to='/home/login'>
            LogIn
          </NavLink>
          <NavLink to='/home/signup'>
            SignUp
          </NavLink> 
          </React.Fragment>
          : 
          <div>
            <div>Hеллоу {this.props.login.username} вы зашли как: </div>
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit">
            <i className="fas fa-user-circle header__usericon"></i>
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
          open={open}
          onClose={this.handleClose}
        >
          <NavLink className='header__dropnav' to='/myCourses'><MenuItem >My Courses</MenuItem></NavLink>
          
          <NavLink className='header__dropnav' to='/mySchool'><MenuItem >My School</MenuItem></NavLink>
          <NavLink className='header__dropnav' to='/profile'><MenuItem ><span><i className="fas fa-user-cog"></i></span>Profile</MenuItem></NavLink>
          <button onClick={this.logout} className='header__dropnav' to='/logout'><MenuItem ><span><i className="fas fa-sign-out-alt"></i></span>Logout</MenuItem></button>
        </Menu>
        </div>}
        
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
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout())
    }
  }



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));