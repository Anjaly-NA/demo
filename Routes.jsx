import React from 'react';
import { Route, BrowserRouter as Router, Switch, withRouter, NavLink } from 'react-router-dom';
import Login from '../src/components/Login';
import LandingPage from '../src/components/LandingPage';

const Routes = (props) =>
    (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Login} />
                <Route exact path="/home" component={LandingPage} />
            </Switch>
        </Router>
    )
export default Routes;