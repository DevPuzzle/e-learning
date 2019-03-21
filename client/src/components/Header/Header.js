import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink, Link, withRouter } from 'react-router-dom';
import './Header.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import * as actions from '../../actions/loginActions';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles, Popper, Fade, Paper } from '@material-ui/core';
import { getUserData } from '../../actions/profileActions';
import { getCourseList } from '../../actions/courseListActions';
import axios from 'axios';
import logo from '../../assets/images/wisdom.png';


const styles = theme => ({
  grow: {
    flexGrow: 1,
  }
});

class Header extends Component {
  state = {
    anchorEl: null,
    left: false,
    openCategoriesList: false,
    openSubcategoriesList: false,
    openThemesList: false,
    selectedCategoryEl: null,
    selectedSubcategoryEl: null,
    selectedThemeEl: null,
    subcategories: null,
    themes: null
  }

  componentDidMount(){
    this.props.onGetCourseList();
    if(this.props.auth){
      this.props.onGetUserData()
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
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

  openPopperHandler = e => {
    const { currentTarget } = e;
    this.setState({
      selectedCategoryEl: null,
      openCategoriesList: false
    })
    this.setState({
      selectedCategoryEl: currentTarget,
      openSubcategoriesList: false,
      openThemesList: false,
      openCategoriesList: !this.state.openCategoriesList,
    });
  }

  leaveMouseHandler = () => {
    this.setState({
      openThemesList: false,
      openSubcategoriesList: false,
      openCategoriesList: false
    })
  }

  showSubcategoriesHandler = (e, id) => {
    const category = this.props.courseList.list.find(category => category._id === id);
    const { currentTarget } = e;

    this.setState({
      selectedSubcategoryEl: currentTarget,
      subcategories: null,
      openSubcategoriesList: false,
      openThemesList: false,
    })
    this.setState({
      selectedSubcategoryEl: currentTarget,
      openSubcategoriesList: true,
      subcategories: category.subcategory
    })
  }

  showThemesHandler = (e, id) => {
    const subcategory = this.state.subcategories.find(subcategory => subcategory._id === id);
    const { currentTarget } = e;
    this.setState({
      openThemesList: true,
      selectedThemeEl: currentTarget,
      themes: subcategory.theme
    })
  }

  selectedThemeItemHandler = (url) => {
    axios.post(`${window.location.origin}/api/course/get/by/theme`, {url})
    .then(response => {
      this.props.history.push(`/courseList/${response.data.theme.url}`)
    })
    this.setState({
      openThemesList: false,
      openSubcategoriesList: false,
      openCategoriesList: false
    })
  }

  render(){
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    const sideList = (
        <List className='drawer'>
          <ListItem className='drawer__link' component={NavLink} to='/courseList/javascript' button>
            <i className="fas fa-book"></i> Courses
          </ListItem>
          <ListItem className='drawer__link' component={NavLink} to='/school/list' button>
            <i className="fas fa-graduation-cap"></i> Schools
          </ListItem>
          {!this.props.auth ?
          <React.Fragment>
          <Divider />
          <ListItem className='drawer__link' component={NavLink} to='/login' button>
            <i className="fas fa-lock"></i> Login
          </ListItem>
          <ListItem className='drawer__link' component={NavLink} to='/signUp' button>
            <i className="fas fa-user-plus"></i> Sign Up
          </ListItem>
          </React.Fragment>
          :
          <React.Fragment>
          <Divider />
          <ListItem className='drawer__link' component={NavLink} to='/mycourses' button>
            <i className="fas fa-user-graduate"></i> My Courses
          </ListItem>
          <ListItem className='drawer__link' component={NavLink} to='/myschools' button>
            <i className="fas fa-school"></i> My Schools
          </ListItem>
          <Divider />
          <ListItem component={NavLink} to='/profile' className='drawer__link' button>
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
        return <img className='header__profileImage' src={`${window.location.origin}/api/${this.props.profile.avatar.userImage}`}/>
      }else if(!this.props.profile.avatar && this.props.profile.userData && this.props.profile.userData.userImage){
        return <img className='header__profileImage' src={`${window.location.origin}/api/${this.props.profile.userData.userImage}`} />;
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
          <NavLink to='/'><img src={logo} alt=""/></NavLink>
        </div>
        <nav className='header__nav'>
          <div className='header__courses'>
          <p className={this.props.location.pathname.includes('courseList') ? 'header__navLink active' : 'header__navLink' } onClick={this.openPopperHandler}>
            Courses
          </p>
          </div>
          <Popper
            placement='bottom' 
            style={{zIndex: '100000'}} 
            open={this.state.openCategoriesList} 
            anchorEl={this.state.selectedCategoryEl}
            onMouseLeave={this.leaveMouseHandler}
            transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <List>
                      {this.props.courseList ? this.props.courseList.list.map(category => (
                        <React.Fragment key={category._id}>
                          <ListItem
                            onMouseOver={(e) => this.showSubcategoriesHandler(e, category._id)}
                            button>
                            <div className='courseListContainer'>
                              <p>{category.name}</p>
                              <p><i className="fas fa-angle-right"></i></p>
                            </div>
                            
                          </ListItem>
                        </React.Fragment>
                      )) : null}
                      <Popper 
                        placement='right-start'
                        style={{zIndex: '100100'}}
                        open={this.state.openSubcategoriesList}
                        anchorEl={this.state.selectedSubcategoryEl}
                        transition>
                        {({TransitionProps}) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                              <List>
                                {this.state.subcategories.map(subcategory => (
                                  <ListItem 
                                    key={subcategory._id}
                                    button
                                    onMouseOver={(e) => this.showThemesHandler(e, subcategory._id)}>
                                    <div className='courseListContainer'>
                                      <p>{subcategory.name}</p>
                                      <p><i className="fas fa-angle-right"></i></p>
                                    </div>
                                  </ListItem>
                                ))}
                                <Popper
                                  placement='right-start'
                                  style={{zIndex: '100200'}}
                                  open={this.state.openThemesList}
                                  anchorEl={this.state.selectedThemeEl}
                                  transition>
                                    {({TransitionProps}) => (
                                      <Fade {...TransitionProps} timeout={350}>
                                        <Paper>
                                          <List>
                                            {this.state.themes.map(theme => (
                                              <ListItem
                                                key={theme._id}
                                                button
                                                onClick={() => this.selectedThemeItemHandler(theme.url)}>
                                                  {theme.name}
                                              </ListItem>
                                            ))}
                                          </List>
                                        </Paper>
                                      </Fade>
                                    )}
                                </Popper>  
                              </List>
                            </Paper>
                          </Fade>
                        )}

                      </Popper>
                    </List>
                  </Paper>
                </Fade>
              )}

          </Popper>
          <div className='header__schools'>
          <NavLink className='header__navLink' activeClassName="header-active" to="/school/list">
            Schools
          </NavLink>
          </div>
        </nav>
        <div className={classes.grow} />
        {/* <div className={`${classes.search} header__search`}>
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
        </div> */}
      </div>
        <div className='header__log'>
        {!this.props.auth ? 
        <React.Fragment>
        <NavLink to='/login' activeClassName="header-active">
            LogIn
          </NavLink>
          <NavLink to='/signup' activeClassName="header-active">
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
          <NavLink onClick={this.handleClose} className='header__dropnav' to='/mycourses'><MenuItem><span><i className="fas fa-user-graduate"></i></span>My Courses</MenuItem></NavLink>
          <NavLink onClick={this.handleClose} className='header__dropnav' to='/myschools'><MenuItem><span><i className="fas fa-school"></i></span>My Schools</MenuItem></NavLink>
          <NavLink onClick={this.handleClose} className='header__dropnav' to='/profile'><MenuItem><span><i className="fas fa-user-cog"></i></span>Profile</MenuItem></NavLink>
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
    profile: state.profile,
    courseList: state.courseList.courseList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
    onGetUserData: () => dispatch(getUserData()),
    onGetCourseList: () => dispatch(getCourseList())
    }
  }



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));