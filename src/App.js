import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Frontend from "./frontend/Frontend";
import Admin from "./admin/Admin";
import Auth from "./frontend/views/auth/Auth";
import Questionnaire from "./admin/components/questionnaire/Questionnaire"

function App() {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path={"/admin"} component={Admin} />
                    <Route path={"/auth"} component={Auth}/>
                    <Route path={"/"} component={Frontend}/>
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}
export default App;
