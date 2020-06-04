import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Frontend from "./frontend/Frontend";
import Admin from "./admin/Admin";
import Auth from "./frontend/views/auth/Auth";

function App() {
    return (
        <Router>
            <Fragment>
                <Switch>
                    <Route path={"/admin"} component={Admin} />
                    <Route path={"/auth"} component={Auth}/>
                    <Route path={"/"} component={Frontend}/>
                </Switch>
            </Fragment>
        </Router>
    );
}

export default App;
