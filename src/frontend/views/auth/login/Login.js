import React, {Component} from 'react';
import {Link} from "react-router-dom";
import OauthSocialButtons from "./OauthSocialButtons";
import AuthContainer from "../AuthContainer";


class Login extends Component {
    render() {
        return (
            <AuthContainer
                title={"Login to TILT"}
                info={"Enter your user credentials to login"}
            >
                <form>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="far fa-user"> </i>
                                </span>
                            </div>
                            <input type="email" className="form-control" id="input-email" placeholder="Enter email" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-unlock-alt"> </i>
                                </span>
                            </div>
                            <input className="form-control" placeholder="Password" type="password" required />
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="far fa-eye"> </i>
                                </span>
                            </div>
                        </div>
                        <div className="d-block d-sm-flex justify-content-between align-items-center mt-2">
                            <div className="form-group form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox"/>
                                    <span className="form-check-sign"> </span> Remember me
                                </label>
                            </div>
                            <div>
                                <Link to="/auth/forgot-password" className="small text-right">Lost password?</Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-block btn-primary">Sign in</button>
                    </div>
                </form>
                <div className="mt-3 mb-4 text-center">
                    <span className="font-weight-normal">or login with</span>
                </div>
                <OauthSocialButtons/>
                <div className="d-block d-flex justify-content-center align-items-center mt-4">
                    <span className="font-weight-normal">Not registered?
                        <Link to="/auth/register" className="font-weight-bold" > Create account
                        </Link>
                    </span>
                </div>
            </AuthContainer>
        );
    }
}

export default Login;
