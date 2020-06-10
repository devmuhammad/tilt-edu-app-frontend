import React, {Fragment, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import Logo from '../../assets/images/logo/tilt-logo.svg';
import LightLogo from '../../assets/images/logo/tilt-logo-light.svg';
import Default from '../../assets/images/default.png';
// import '../../../assets/css/admin/css/horizontal-layout/style.css';

const Navbar = () => {
    const [userProfile, setUserProfile] = React.useState({})
 
    useEffect (()=> {
       

        const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))
       
        setUserProfile(usrProfile)
    },[])

    return (
        <Fragment>
            <div className="horizontal-menu">
                <nav className="navbar top-navbar col-lg-12 col-12 p-0 bg-soft">
                    <div className="container">
                        <div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-between">

                            <div className="text-center navbar-brand-wrapper d-flex align-items-start justify-content-start">
                                <NavLink to={"/admin"} className={"navbar-brand brand-logo"}>
                                    <img src={Logo} alt="logo"/>
                                </NavLink>

                                <NavLink to={"/admin"} className={"navbar-brand brand-logo-mini"}>
                                    <img src={LightLogo} alt="logo"/>
                                </NavLink>

                            </div>
                            <ul className="navbar-nav navbar-nav-right">
                                <li className="nav-item dropdown">
                                    <a className="nav-link count-indicator dropdown-toggle"
                                       id="notificationDropdown" href="#"
                                       data-toggle="dropdown">
                                        <i className="mdi mdi-bell-outline mx-0"></i>
                                        <span className="count"></span>
                                    </a>
                                </li>
                                <li className="nav-item nav-profile dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown"
                                       id="profileDropdown">
                                        <img src={Default} alt="profile"/>
                                        <span className="nav-profile-name">{userProfile.fullname}</span>
                                    </a>
                                </li>
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
                            <li className="nav-item">
                                <NavLink to={"/admin"} className={"nav-link"}>
                                    <i className="mdi mdi-view-dashboard-outline menu-icon"></i>
                                    <span className="menu-title">Dashboard</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/admin/questionnaire"} className={"nav-link"} >
                                    <i className="mdi mdi-magnet menu-icon"></i>
                                    <span className="menu-title">Questionaire</span>
                                </NavLink>
                            </li>

                            {userProfile.roletype === "ADMIN" &&<li className="nav-item">
                                <a className="nav-link" href="pages/widgets/widgets.html">
                                    <i className="mdi mdi-cash-100 menu-icon"></i>
                                    <span className="menu-title">Financial</span>
                                </a>
                            </li>}

                            <li className="nav-item">
                                <a className="nav-link" href="pages/widgets/widgets.html">
                                    <i className="mdi mdi-account-multiple menu-icon"></i>
                                    <span className="menu-title">Manage Users</span>
                                </a>
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