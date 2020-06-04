import React from 'react';
import darkLogo from "../../../../assets/images/logo/tilt-logo.svg"
import lightLogo from "../../../../assets/images/logo/tilt-logo-light.svg"

const NavLogo = () => {
    return (
        <a className="navbar-brand" href="/">
            <img className="navbar-brand-dark" src={lightLogo} alt="NavLogo dark"/>
            <img className="navbar-brand-light" src={darkLogo} alt="NavLogo light"/>
        </a>
    );
};

export default NavLogo;
