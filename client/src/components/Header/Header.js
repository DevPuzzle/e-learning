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
import { withStyles, Popper, Fade, Paper } from '@material-ui/core';
import { getUserData } from '../../actions/profileActions';
import { getCourseList } from '../../actions/courseListActions';
import axios from 'axios';
import logo from '../../assets/images/OWL.png';


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
    this.props.onGetCourseList();
    /* this.setState({
      selectedCategoryEl: null,
      openCategoriesList: false
    }) */
    this.setState(state => ({
      selectedCategoryEl: currentTarget,
      openSubcategoriesList: false,
      openThemesList: false,
      openCategoriesList: true,
    }));
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

  selectedThemeItemHandler = (id) => {
    axios.post('http://localhost:5000/course/get/by/theme', {id})
    .then(response => {
      this.props.history.push(`/courseList/${response.data.theme.name}`)
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
          <ListItem className='drawer__link' component={Link} to='/myCourses' button>
            <i className="fas fa-book"></i> Courses
          </ListItem>
          <ListItem className='drawer__link' component={Link} to='/mySchools' button>
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
          <NavLink to='/'><img src={logo} alt=""/><span>OwlUnion</span></NavLink>
        </div>
        <nav className='header__nav'>
          <div className='header__courses'>
          <p onMouseOver={this.openPopperHandler}>
            Courses
          </p>
          </div>
          <Popper
            placement='bottom' 
            style={{zIndex: '100000'}} 
            open={this.state.openCategoriesList} 
            anchorEl={this.state.selectedCategoryEl}
            onMouseLeave={this.leaveMouseHandler}>
              {
               
                  <Paper>
                    <List>
                      {this.props.courseList ? this.props.courseList.list.map(category => (
                        <React.Fragment key={category._id}>
                          <ListItem
                            onMouseOver={(e) => this.showSubcategoriesHandler(e, category._id)}
                            button>
                            {category.name}
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
                                    {subcategory.name}
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
                                                onClick={() => this.selectedThemeItemHandler(theme._id)}>
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
             }

          </Popper>
          <div className='header__schools'>
          <p>
            Schools
          </p>
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
          <NavLink onClick={this.handleClose} className='header__dropnav' to='/myCourses'><MenuItem><span><i className="fas fa-user-graduate"></i></span>My Courses</MenuItem></NavLink>
          <NavLink onClick={this.handleClose} className='header__dropnav' to='/mySchools'><MenuItem><span><i className="fas fa-school"></i></span>My Schools</MenuItem></NavLink>
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