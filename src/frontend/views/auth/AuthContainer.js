import React from 'react';
import {Link, withRouter} from "react-router-dom";
import Logo from "../../assets/images/logo/tilt-logo.svg";

const AuthContainer = (props) => {
    function goBack() {
        props.history.goBack()
    }

    return (
        <main>
            <section className="min-vh-100 d-flex align-items-center">
                <div className="container">
                    <div className="row justify-content-center form-bg-image"
                        data-background={props.bgImage}>
                        <div className="col-12 col-lg-6">
                            <div className="signin-inner bg-white shadow-sm border rounded border-soft p-3 p-lg-5">
                                <div className="d-flex align-content-lg-start justify-content-start p-2">
                                    <a
                                        className="btn btn-icon p-0 text-primary"
                                        onClick={goBack}>
                                        <i className="fa fa-arrow-left fa-lg"> </i>
                                    </a>
                                    <p className="ml-2 text-primary">Go Back</p>
                                </div>
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <Link className="navbar-brand mb-4" to="/">
                                        <img src={Logo} alt="TILT Logo"/>
                                    </Link>
                                    <h2 className="font-weight-bold">{props.title}</h2>
                                    <p className="text-gray mb-0">{props.info}</p>
                                </div>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default withRouter(AuthContainer);
