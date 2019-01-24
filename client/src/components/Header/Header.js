import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink, withRouter } from 'react-router-dom';
import './Header.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import * as actions from '../../actions/loginActions';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

class Header extends Component {

  state = {
    anchorEl: null,
    coursesEl: null,
    schoolsEl: null
  }

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
    this.props.history.push('/');
  }




  render(){
    const { anchorEl, coursesEl, schoolsEl } = this.state;
    const open = Boolean(anchorEl);

  return(   
    <AppBar 
      
      color='default'>
      <div className='wrapper'>
      <Toolbar className='header'>
      <div className='header__left'>
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
          <NavLink className='header__dropnav' to='/profile'><MenuItem >Profile</MenuItem></NavLink>
          <button onClick={this.logout}className='header__dropnav' to='/logout'><MenuItem >Logout</MenuItem></button>
        </Menu>
        </div>}
        
        </div>
      </Toolbar>
      </div>
      
    </AppBar>
  )
} 
}

const mapStateToProps = (state) => {
  return {
    auth: state.login.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout())
    }
  }



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));