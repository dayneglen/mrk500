import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import ProductsPage from './Components/ProductsPage';
import SingleProductPage from './Components/SingleProductPage';
import Cart from './Components/Checkout/Cart';
import Account from './Components/Account';
import AdminDashboard from './Components/Admin/AdminDashboard';

export default (
    <Switch>
        <Route exact path = '/' component={Landing} />
        <Route path = '/login' component={Login} />
        <Route path = '/register' component={Register} />
        <Route exact path = '/shirts' component={ProductsPage} />
        <Route path = '/shirts/:id' component={SingleProductPage} />
        <Route path = '/cart' component={Cart} />
        <Route path = '/account' component={Account} />
        <Route path = '/admin/dashboard' component={AdminDashboard} />
    </Switch>
)