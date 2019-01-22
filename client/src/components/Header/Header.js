import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/images/open-book.png';
import { NavLink, withRouter } from 'react-router-dom';
import './Header.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import * as actions from '../../actions/loginActions';

class Header extends Component {

  state = {
    anchorEl: null
  }



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

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

  return(   
    <AppBar 
      style={window.location.pathname === '/' ?
      {
        background: 'transparent',
        position: 'absolute',
        boxShadow: 'none'
      } : {
        background: '#151516',
        position: 'relative'
      }}
      color='default'>
      
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