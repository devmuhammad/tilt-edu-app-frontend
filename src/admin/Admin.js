import React, {Component,Fragment, useEffect} from 'react';
import { Switch, Route } from "react-router-dom";
import StyleLinks from './styleLinks';
import Template from './views/Template';
import './assets/Custom.scss';
import Questionnaire from "./components/questionnaire/Questionnaire";
import Dashboard from "./components/dashboard/Dashboard";
import Users from "./components/users/users";

class Admin extends Component{

    componentDidMount() {
        StyleLinks.map(item  => {
            const style = document.createElement("link");
            style.type = "text/css";
            style.rel = "stylesheet";
            style.href = item;
            style.async = true;
            console.log(style);
            document.head.appendChild(style)
        });
    }

    render() {
        return (
            <Fragment>
                <Template>
                    <Switch>
                        <Route path={"/admin"}  exact component={Dashboard}/>
                        <Route path={"/admin/questionnaire"} component={Questionnaire}/>
                        <Route path={"/admin/user-manager"}  exact component={Users}/>
                    </Switch>
                </Template>
            </Fragment>
        );
    }
}
export default Admin;