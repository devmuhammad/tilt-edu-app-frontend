import React from 'react';
import { Route, useLocation, Switch } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Login from "./login/Login";
import Register from "./register/Register";
import ForgotPassword from "./password-reset/ForgotPassword";

const Auth = (props) => {
    let location = useLocation();
    return (
        <div>
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}
                >
                    <Switch location={location}>
                        <Route path="/auth/login" children={<Login />} />
                        <Route path="/auth/register" children={<Register />}/>
                        <Route path="/auth/forgot-password" children={<ForgotPassword />}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
};

export default Auth;
