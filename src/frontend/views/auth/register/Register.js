import React, {Component} from 'react';
import AuthContainer from "../AuthContainer";
import OauthSocialButtons from "../login/OauthSocialButtons";

class Register extends Component {

    state = {
        active: "personal"
    };

    componentDidMount() {
    }

    personalRegForm = () => {
        return (
            <form action="#">
                <h3 className="text-gray text-center mt-3">Create a personal count</h3>
                <div className="form-row">
                    <div className="form-group col-6">
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="far fa-user"> </i>
                            </span>
                            </div>
                            <input type="text" className="form-control" id="input-last-name" placeholder="Last Name" required/>
                        </div>
                    </div>
                    <div className="form-group col-6">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="far fa-user"> </i>
                                </span>
                            </div>
                            <input type="text" className="form-control" id="input-first-name" placeholder="First Name" required/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="far fa-envelope"> </i>
                                </span>
                        </div>
                        <input type="email" className="form-control" id="input-email" placeholder="Enter email" required/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-phone"> </i>
                                </span>
                        </div>
                        <input type="phone" className="form-control" id="input-phone" placeholder="Phone Number" required/>
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
                    <div className="input-group mt-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-unlock-alt"> </i>
                            </span>
                        </div>
                        <input type="password" className="form-control" id="input-password-confirm" placeholder="Confirm password" required />
                    </div>
                    <div className="d-block d-sm-flex justify-content-between align-items-center mt-2">
                        <div className="form-group form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox"/>
                                <span className="form-check-sign"> </span> I
                                agree to the <a href="terms.html">terms and conditions</a>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-block btn-primary">Sign up</button>
                </div>
                <div className="mt-3 mb-4 text-center">
                    <span className="font-weight-normal">or Register with</span>
                </div>
                <OauthSocialButtons/>
            </form>
        )
    };

    schoolRegForm = () => (
        <form action="#">
            <h3 className="text-gray text-center mt-3">Create an account for a school</h3>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fas fa-school"> </i>
                        </span>
                    </div>
                    <input type="text" className="form-control" id="input-school-name" placeholder="School Name" required/>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="far fa-envelope"></i>
                        </span>
                    </div>
                    <input type="email" className="form-control" id="input-email" placeholder="School Email Address" required/>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-phone"> </i>
                            </span>
                    </div>
                    <input type="phone" className="form-control" id="input-phone" placeholder="Phone Number" required/>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fas fa-map-pin"> </i>
                    </span>
                    </div>
                    <input type="text" className="form-control" id="input-school-name" placeholder="School Address" required/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <input type="text" className="form-control" id="inputCity" placeholder="City"/>
                </div>
                <div className="form-group col-6">
                    <input type="text" className="form-control" id="zip" placeholder="Enter Zip Code"/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-6">
                    <select className="custom-select" id="state">
                        <option selected>State (Select)</option>
                        <option>FCT (Abuja)</option>
                        <option>Lagos</option>
                        <option>Portharcourt</option>
                    </select>
                </div>
                <div className="form-group col-6">
                    <select className="custom-select" id="country">
                        <option selected>Country (Select)</option>
                        <option>Nigeria</option>
                        <option>Other Africa</option>
                        <option>Outside Africa</option>
                    </select>
                </div>
            </div>
            <hr/>
            <p className="text-gray">Administrator Information</p>
            <div className="form-row">
                <div className="form-group col-6">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="far fa-user"> </i>
                            </span>
                        </div>
                        <input type="text" className="form-control" id="input-first-name" placeholder="First Name" required/>
                    </div>
                </div>
                <div className="form-group col-6">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="far fa-user"> </i>
                            </span>
                        </div>
                        <input type="text" className="form-control" id="input-last-name" placeholder="Last Name" required/>
                    </div>
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
                <div className="input-group mt-3">
                    <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-unlock-alt"> </i>
                            </span>
                    </div>
                    <input type="password" className="form-control" id="input-password-confirm" placeholder="Confirm password" required />
                </div>
                <div className="d-block d-sm-flex justify-content-between align-items-center mt-2">
                    <div className="form-group form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox"/>
                            <span className="form-check-sign">
                            </span> I agree to the <a href="#">terms and conditions</a>
                        </label>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <button type="submit" className="btn btn-block btn-primary">Sign up</button>
            </div>
        </form>
    );

    showForm = () =>
        this.state.active === "personal" ?  this.personalRegForm() : this.schoolRegForm();

    setView = (type) => {
        this.setState({active: type})
    };

    render() {
        return (
            <AuthContainer
                title={"Register on TILT"}
                info={"Create a TILT Account"}
            >

                <div className="btn-group w-100">
                    <button
                        className={`btn btn-lg ${this.state.active === "personal" ?  "btn-gray" : "btn-gray-100"}`}
                        onClick={this.setView.bind(this, "personal")}
                    >Personal Account</button>
                    <button
                        className={`btn btn-lg ${this.state.active === "school" ?  "btn-gray" : "btn-gray-100"}`}
                        onClick={this.setView.bind(this, "school")}
                    >School Account</button>
                </div>

                {this.showForm()}

                <div className="d-block d-sm-flex justify-content-center align-items-center mt-4">
                    <span className="font-weight-normal">Already have an account?
                        <a href="/auth/login" className="font-weight-bold">&nbsp; Login here</a>
                    </span>
                </div>
            </AuthContainer>
        );
    }
}

export default Register;
