import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/LandingPage/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import ProductsPage from './Components/Products/ProductsPage';
import SingleProductPage from './Components/Products/SingleProductPage';
import Cart from './Components/Checkout/Cart';
import Account from './Components/CustomerAccount/Account';
import AdminDashboard from './Components/Admin/AdminDashboard';
import CustomerOrderPage from './Components/CustomerAccount/CustomerOrderPage';
import CheckoutSuccess from './Components/Checkout/CheckoutSuccess';

export default (
    <Switch>
        <Route exact path = '/' component={Landing} />
        <Route path = '/login' component={Login} />
        <Route path = '/register' component={Register} />
        <Route exact path = '/shirts' component={ProductsPage} />
        <Route path = '/shirts/:id' component={SingleProductPage} />
        <Route path = '/cart' component={Cart} />
        <Route exact path = '/account' component={Account} />
        <Route path='/account/order/:id' component={CustomerOrderPage} />
        <Route path = '/admin/dashboard' component={AdminDashboard} />
        <Route path= '/checkout/success' component={CheckoutSuccess}/>
    </Switch>
)