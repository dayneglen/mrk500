import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

export default (
    <Switch>
        <Route exact path = '/' component={Landing} />
        <Route path = '/login' component={Login} />
        <Route path = '/register' component={Register} />
    </Switch>
)