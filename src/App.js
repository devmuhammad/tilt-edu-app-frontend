import React, {Fragment, useEffect} from 'react';
import {BrowserRouter, Router, Route, Switch, Link} from "react-router-dom";
import Frontend from "./frontend/Frontend";
import Admin from "./admin/Admin";
import Auth from "./frontend/views/auth/Auth";
import { useHistory,useLocation } from "react-router-dom";
import axios from 'axios';
import { withRouter } from 'react-router'; 



function App (props) {
    const history = useHistory();
    const location = useLocation()

    useEffect (() => {
       const checkAuth = async () => {
            
            
            const authToken = await JSON.parse(localStorage.getItem('@AppT4k3n'))

            if (authToken !== null){
                const config = {
                    headers: { Authorization: `Bearer${authToken}` }
                };
              
                
                // Check if token is still valid or relogin
                axios.get('http://tiltapp-api.herokuapp.com/auth/get-detail',config).then( res => {
                    if(!res.status){
                        history.replace("/auth/login")
                    }else {
                        const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))

                        const path = location.pathname.split("/")
                        if(path[1] === "auth"){
                            history.replace("/")
                        }
                        
                    // check if user has access to location path
                    if (usrProfile.role.role === "PRIVATE_LEARNER" || usrProfile.role.role === "STUDENT"){
                        if (path[1] === "admin"){
                            history.replace("/test")
                        }
                        
                    }
                    }

                   }).catch( err => {
                        console.log(err);
                   });

            } else{
                const path = location.pathname.split("/")
                        if (path[1] === "admin"){
                            history.replace("/auth/login")
                        }
                    }
            
        }

        checkAuth()
    }, [history])

    return (
        // <BrowserRouter>
            <Fragment>
                
                <Switch>
                    <Route path={"/admin"} component={Admin} />
                    <Route path={"/auth"} component={Auth}/>
                    <Route path={"/"} component={Frontend}/>
                </Switch>
            </Fragment>
        // </BrowserRouter>
    );
}

export default withRouter(App);
