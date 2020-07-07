import React, {Component} from 'react';
import {Link} from "react-router-dom";
import OauthSocialButtons from "./OauthSocialButtons";
import AuthContainer from "../AuthContainer";
import { useLocation } from "react-router-dom";
import Loader from 'react-loader-spinner'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router'; 


// const history = useHistory();
// const location = useLocation();


class Login extends Component {

    state = {
        email:"",
        password:"",
        loading:false,

    }

    componentDidMount() {
        // console.log(this.props.location)
        if (this.props.location.state){
        this.setState({email: this.props.location.state.email})
        this.setState({password: this.props.location.state.password})
        }
    }

        tryLogin = (e) => {
            e.preventDefault()
            this.setState({loading: true})

            if (
                this.state.email === "" ||
                this.state.password === ""
            ){
                return alert("Invalid ! Please enter Email/Password")
                // return;
            }

            const data = {}
            data.email = this.state.email
            data.password = this.state.password

            axios.post('https://tiltapp-api.herokuapp.com/login',data).then(async res => {
                const resp = res.data
                if (resp.status){
                  let token = resp.token
                  await localStorage.setItem('@AppT4k3n', JSON.stringify(token))
                    
                  await localStorage.setItem('@UserProfile', JSON.stringify(resp.data))
                  
                  if(resp.data.role.role === "PRIVATE_LEARNER"){
                    this.setState({loading: false})
                    this.props.history.replace('/test')
                  }
                  else if(resp.data.role.role === "STUDENT"){
                    this.setState({loading: false})
                    this.props.history.replace('/test')
                  }
                  else if(resp.data.role.role === "ADMIN"){
                    this.setState({loading: false})
                    this.props.history.replace('/admin')
                  }
                  else if(resp.data.role.role === "SCHOOL_ADMIN"){
                    this.setState({loading: false})
                    this.props.history.replace('/admin/user-manager/student')
                  }
                 

                    }else {
                        this.setState({loading: false})
                        alert("Login Error !"+res.message)
                
                    }
                
            }).catch( err => {
                this.setState({loading: false})
                alert("Invalid Login Details, Please try Again")
                console.log(err);
            });
        }


    render() {
        return (
            <AuthContainer
                title={"Login"}
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
                            <input type="email" className="form-control" id="input-email" 
                            placeholder="Enter email" 
                            required 
                            value={this.state.email}
                            onChange={event => this.setState({email: event.target.value.trim()})}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-unlock-alt"> </i>
                                </span>
                            </div>
                            <input className="form-control" placeholder="Password" 
                            type="password" 
                            required 
                            value={this.state.password}
                            onChange={event => this.setState({password: event.target.value.trim()})}/>
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
                        <button type="submit" className="btn btn-block btn-primary" onClick={this.tryLogin}>
                        {this.state.loading ? <Loader edge="end"
                            type="Oval"
                            color="white"
                            height={30}
                            width={30}
                            //  timeout={3000} //3 secs
                            /> : <span>Sign in</span> }
                            </button>
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

export default withRouter(Login);
