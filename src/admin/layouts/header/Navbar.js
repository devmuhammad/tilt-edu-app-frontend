import React, {Fragment, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import Logo from '../../assets/images/logo/tilt-logo.svg';
import LightLogo from '../../assets/images/logo/tilt-logo-light.svg';
import Default from '../../assets/images/default.png';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import '../../../assets/css/admin/css/horizontal-layout/style.css';
import ChangePwd from '../../../frontend/components/sections/header/Changepwd'
import UpdateProfile from '../../../frontend/components/sections/header/UpdateProfile'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const Navbar = () => {
    const [userProfile, setUserProfile] = React.useState({})
    const [clickedForm, setClickedForm] = React.useState(undefined)
    const [openedForm, setOpenedForm] = React.useState(undefined)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false)
    const [isAdmin, setIsAdmin] = React.useState(false)

 
    useEffect (()=> {
       

        const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))
       
        setUserProfile(usrProfile)
        if (usrProfile.role.role === "ADMIN"){
            setIsAdmin(true)
        }
    },[])

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const closeMenu = () => {
        setAnchorEl(null);
      };

      const  handleClick = () => {
        setOpen(true)
      };
    
     const  handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false)

      };

   
    const changePwd = () =>{
        closeMenu()
        setClickedForm(1)
    };
    const editProfile = () =>{
        closeMenu()
        setOpenedForm(1)
    };


    const handleRemoveModal = () => {
        // this.setState( () =>({clickedForm:undefined}))
        setOpenedForm(undefined)
        setClickedForm(undefined)
    };

    const logout = async () =>{
        const Token = await JSON.parse(localStorage.getItem('@AppT4k3n'))

        const config = {
            headers: { Authorization: `Bearer${Token}` }
        };
       await axios.post('https://tiltapp-api.herokuapp.com/auth/logout',config).then(async res => {
            if (res.status){
                await localStorage.removeItem('@AppT4k3n')
                await localStorage.removeItem('@UserProfile')
                // setUserProfile({})
                window.location.reload(false)
            }
        }).catch(async  err => {
            await localStorage.removeItem('@AppT4k3n')
            await localStorage.removeItem('@UserProfile')
            // setUserProfile({})
            window.location.reload(false)
        }  )
    }

    return (
        <Fragment>
            <div className="horizontal-menu">
                <nav className="navbar top-navbar col-lg-12 col-12 p-0 bg-soft">
                    <div className="container">
                        <div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-between">
                            
                            <div className="text-center navbar-brand-wrapper d-flex align-items-start justify-content-start">
                                <NavLink to={"/"} className={"navbar-brand brand-logo"}>
                                    <img src={Logo} alt="logo"/>
                                </NavLink>

                                <NavLink to={"/"} className={"navbar-brand brand-logo-mini"}>
                                    <img src={LightLogo} alt="logo"/>
                                </NavLink>
                                <ChangePwd
                                clickedForm={clickedForm}
                                showSuccess={handleClick}
                                handleRemoveModal={handleRemoveModal}
                            />
                            <UpdateProfile
                                openedForm={openedForm}
                                showSuccess={handleClick}
                                handleRemoveModal={handleRemoveModal}
                            />
                            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">
                                Success ! Logged Out
                                </Alert>
                                </Snackbar>
                            </div>
                            <ul className="navbar-nav navbar-nav-right">
                                <li className="nav-item dropdown">
                                    <a className="nav-link count-indicator dropdown-toggle"
                                       id="notificationDropdown" 
                                       data-toggle="dropdown">
                                        <i className="mdi mdi-bell-outline mx-0"></i>
                                        <span className="count"></span>
                                    </a>
                                </li>
                                <li className="nav-item nav-profile dropdown" onClick={openMenu}>
                                    <a className="nav-link dropdown-toggle"  data-toggle="dropdown"
                                       id="profileDropdown">
                                        <img src={Default} alt="profile"/>
                                        <span className="nav-profile-name">{userProfile && userProfile.fullname}</span>
                                    </a>
                                    
                                </li>
                                <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={closeMenu}
                                            >
                                        <MenuItem onClick={editProfile}>Edit Profile</MenuItem>
                                        <MenuItem onClick={changePwd}>Change Password</MenuItem>
                                        <MenuItem onClick={logout}>Logout</MenuItem>
                                    </Menu>
                                <li className="nav-item nav-toggler-item-right d-lg-none">
                                    <button className="navbar-toggler align-self-center" type="button"
                                            data-toggle="horizontal-menu-toggle">
                                        <span className="mdi mdi-menu"></span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <nav className="bottom-navbar">
                    <div className="container">
                        <ul className="nav page-navigation">
                        {isAdmin && <li className="nav-item">
                                <NavLink to={"/admin"} className={"nav-link"}>
                                    <i className="mdi mdi-view-dashboard-outline menu-icon"></i>
                                    <span className="menu-title">Dashboard</span>
                                </NavLink>
                            </li>}
                            {isAdmin && <li className="nav-item">
                                <NavLink to={"/admin/questionnaire"} className={"nav-link"} >
                                    <i className="mdi mdi-magnet menu-icon"></i>
                                    <span className="menu-title">Questionaire</span>
                                </NavLink>
                            </li>}

                           {isAdmin && <li className="nav-item">
                                <a className="nav-link" href="">
                                    <i className="mdi mdi-cash-100 menu-icon"></i>
                                    <span className="menu-title">Financial</span>
                                </a>
                            </li>
                            }

                            <li className="nav-item">
                                    <NavLink to={"/admin/user-manager"} className={"nav-link"} >
                                        <i className="mdi mdi-magnet menu-icon"></i>
                                        <span className="menu-title">Manage Users</span>
                                    </NavLink>
                            </li>

                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <span className="menu-title">More</span>
                                    <i className="menu-arrow"></i></a>
                                <div className="submenu">
                                    <ul className="submenu-item">
                                        <li className="nav-item"><a className="nav-link"
                                                                    href="pages/apps/email.html">Email</a></li>
                                        <li className="nav-item"><a className="nav-link"
                                                                    href="pages/apps/calendar.html">Calendar</a>
                                        </li>
                                        <li className="nav-item"><a className="nav-link"
                                                                    href="pages/apps/todo.html">Todo List</a>
                                        </li>
                                        <li className="nav-item"><a className="nav-link"
                                                                    href="pages/apps/gallery.html">Gallery</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </Fragment>
    );
};

export default Navbar;