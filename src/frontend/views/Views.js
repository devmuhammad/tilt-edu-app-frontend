import React, {Component} from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./home/Home"
import TestHome from "./test-views/TestHome";
import About from "./about/About";
import Questionnaire from "./test-views/Questionnaire";
import ErrorPage from "./error/404";
import Result from "./test-views/Result";

class Views extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/"} exact  component={Home}/>
                <Route path={"/about"}  exact component={About}/>
                <Route path={"/test"} exact  component={TestHome}/>
                <Route path={"/test/take-test"}  exact component={Questionnaire}/>
                <Route path={"/test/summary-result"} exact  component={Result}/>
                <Route component={ErrorPage} />
            </Switch>
        );
    }
}
export default Views;
