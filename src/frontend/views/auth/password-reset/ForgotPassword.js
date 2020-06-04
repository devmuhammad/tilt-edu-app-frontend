import React, {Component} from 'react';
import AuthContainer from "../AuthContainer";

class ForgotPassword extends Component {
    render() {
        return (
            <AuthContainer
                title={"Reset Password"}
                info={"Enter email to send reset link to"}>

                <form>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="far fa-user"> </i>
                                </span>
                            </div>
                            <input type="email" className="form-control" id="input-email" placeholder="Enter email" required/>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-block btn-primary">Send link</button>
                    </div>
                </form>
            </AuthContainer>
        );
    }
}

export default ForgotPassword;
