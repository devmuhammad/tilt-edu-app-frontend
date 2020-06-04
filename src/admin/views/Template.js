import React, {Fragment} from 'react';
import Navbar from '../layouts/header/Navbar';

const Template = (props) => {
    return (
        <Fragment>
            <Navbar/>
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    {props.children}
                    <footer className="footer">
                        <div className="w-100 clearfix">
                                <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © 2020 <a
                                    href="#" target="_blank">TILT</a>. All rights reserved.</span>
                        </div>
                    </footer>
                </div>
            </div>
        </Fragment>
    );
};

export default Template;