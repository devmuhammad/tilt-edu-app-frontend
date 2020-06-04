import React, {Fragment} from 'react';
import Logo from "../../../assets/images/logo/tilt-logo.svg"
import SocialIconButton from "../../snippets/SocialIconButton";
import NavActionButton from "../../snippets/NavActionButton";

const Footer = () => {
    return (
        <Fragment>
            <section className="section py-0">
                <div className="container">
                    <div className="row position-relative align-items-center no-gutters z-2">
                        <div className="col">
                            <div className="card-group">
                                <div className="card border-left-md border-soft py-2 px-3 py-lg-4 px-lg-5">
                                    <div className="card-body"><h4 className={"text-primary"}>Follow us on Social Media</h4>
                                        <p className="lead mt-3 mb-4">We are more than happy to connect with you
                                        </p>
                                        <ul className="list-inline mb-0">
                                            <SocialIconButton
                                                type={"facebook"}
                                                size={"sm"}
                                                title={"Like us on Facebook"}
                                                link={"#"}
                                            />
                                            <SocialIconButton
                                                type={"twitter"}
                                                size={"sm"}
                                                title={"Follow us on Twitter"}
                                                link={"#"}
                                            />
                                            <SocialIconButton
                                                type={"instagram"}
                                                size={"sm"}
                                                title={"Follow us on Instagram"}
                                                link={"#"}
                                            />
                                        </ul>
                                    </div>
                                </div>
                                <div className="card border-left-md border-soft py-2 px-3 py-lg-4 px-lg-5">
                                    <div className="card-body">
                                        <p className="lead mt-3 mb-4">Become a Part of the Learning Revolution</p>
                                        <div className="d-flex justify-content-between">
                                            <NavActionButton
                                                link={"/test-views"}
                                                className={"btn btn-sm btn-pill btn-primary animate-up-2"}
                                                //icon={"fa fa-file-alt"}
                                                text={"Take The Test"}
                                            />
                                            <NavActionButton
                                                link={"/auth/login"}
                                                className={"btn btn-sm btn-pill btn-secondary animate-up-2"}
                                                //icon={"fa fa-file-alt"}
                                                text={"Login"}
                                            />
                                            <NavActionButton
                                                link={"/auth/register"}
                                                className={"btn btn-sm btn-pill btn-warning animate-up-2"}
                                                //icon={"fa fa-file-alt"}
                                                text={"Register"}
                                            />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>
            <footer className="footer pt-10 pt-lg-11 pb-4 bg-soft text-dark mt-n9">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <a className="footer-brand" href="/">
                                <img src={Logo} alt="brand"/>
                            </a>
                            <h6 className="text-primary pt-4 pb-0">The Intentional Learning Testing Platform</h6>
                        </div>
                    </div>
                    <hr className="mb-4"/>
                    <div className="row">
                        <div className="col mb-4 mb-md-0">
                            <div className="d-flex text-center justify-content-center align-items-center">
                                <p className="small text-gray mb-0"> ©
                                    <a href="/" target="_blank" className={"ml-1 mr-1"}>TILT Platform</a>
                                    <span className="current-year"></span>. All rights
                                    reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
};

export default Footer;
