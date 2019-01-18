import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/images/open-book.png';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

class Header extends Component {

  state = {
    isAuth: false,
    anchorEl: null
  }



  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };




  render(){

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

  return(
    <AppBar color='default'>
      
      <Toolbar className='header'>
        <div className='header__logo'>
          <NavLink to='/'><img src={logo} alt="eLearn"/></NavLink>
        </div>
        <nav className='header__nav'>
          <NavLink to='/courses'>
            Courses
          </NavLink>
          <NavLink to='/schools'>
            Schools
          </NavLink>
        </nav>
        <div className='header__log'>
        {!this.state.isAuth ? 
        <React.Fragment>
        <NavLink to='/login'>
            LogIn
          </NavLink>
          <NavLink to='/signup'>
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
          <NavLink className='header__dropnav' to='/logout'><MenuItem >Logout</MenuItem></NavLink>
        </Menu>
        </div>}
        
        </div>
      </Toolbar>
    </AppBar>
  )
} 
}

export default Header;