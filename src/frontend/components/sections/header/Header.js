import React from 'react';
import NavLogo from "./navigation/NavLogo";
import NavigationLinks from "./navigation/NavigationLinks";
import NavActionButton from "../../snippets/NavActionButton";

const Header = (props) => {
    return (
        <header className="header-global">
            <nav id="navbar-main"
                className={`navbar navbar-main navbar-expand-lg navbar-transparent navbar-${props.navBarType} navbar-theme-primary headroom py-lg-2 px-lg-6`}>
                <div className="container">
                    <NavLogo/>
                    <div className="navbar-collapse collapse" id="navbar_global">
                        <div className="navbar-collapse-header">
                            <div className="row">
                                <div className="col-6 collapse-brand">
                                    <NavLogo/>
                                </div>
                                <div className="col-6 collapse-close">
                                    <a
                                        href="#navbar_global"
                                        role="button"
                                        className="fas fa-times"
                                        data-toggle="collapse"
                                        data-target="#navbar_global"
                                        aria-controls="navbar_global"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <NavigationLinks/>
                    </div>
                    <div className="d-flex align-items-center">
                       <NavActionButton
                           link={"/test"}
                           className={"btn mr-3 btn-pill btn-secondary animate-up-2"}
                           icon={"fa-file-alt"}
                           text={"Take Test"}
                       />
                       <NavActionButton
                           link={"/auth/login"}
                           className={"btn btn-sm mr-3 btn-pill btn-tertiary animate-up-2"}
                           icon={"fa-unlock-alt"}
                           text={"Login"}
                       />
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"> </span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
