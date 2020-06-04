import React from 'react';
import ErrorImage from "../../assets/images/illustrations/404-error.svg"

const Page404 = () => {
    return (
        <main>
            <section className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <div>
                                <a href="/">
                                    <img className="img-fluid w-75" src={ErrorImage} alt="404-image"/>
                                </a>
                                <h1 className="mt-5">
                                    Page not &nbsp;
                                    <span className="font-weight-bolder text-primary">
                                        found
                                    </span>
                                </h1>
                                <p className="lead my-4">
                                    Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.
                                </p>
                                <a className="btn btn-primary animate-hover" href="/">
                                    <i className="fas fa-chevron-left mr-3 pl-2 animate-left-3"> </i>
                                    Go back home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Page404;
