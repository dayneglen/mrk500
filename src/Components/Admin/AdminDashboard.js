import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AdminProductView from './AdminProductView';
import AddProduct from './AddProduct';
import { getUser } from '../../redux/userReducer';

const AdminDashboard = props => {


    const [productList, setProductList] = useState([]),
          [pageView, setPageView] = useState('one');


   // need a useEffect to check if user is an admin or not

    useEffect(() => {
        getProductList();
    }, [])

    const handleLogout = () => {
        axios.get('/auth/logout').then(_ => {
            props.getUser({})
            props.history.push('/');
        }).catch(err => console.log(err))
    }

    const getProductList = () => {
        axios.get('/api/products').then(res => {
            setProductList([...res.data]);
        }).catch(err => console.log(err))
    }

    const removeProduct = id => {
        axios.put(`/api/product/remove/${id}`).then(() => {
            getProductList();
        }).catch(err => console.log(err))
    }

    const editProduct = (id, price, name, img_url) => {
        axios.put(`/api/product/${id}`, {price, name, img_url}).then(_ => {
            getProductList();
        }).catch(err => console.log(err));
    }

    const currentProducts = productList.map((product, i) => {
        return product.show_product 
            ? <AdminProductView key={i} product={product} removeProductFn={removeProduct} editProductFn={editProduct}/>
            : null
    });

    const pastProducts = productList.map((product, i) => {
        return product.show_product
            ? null
            : <AdminProductView key={i} product={product} removeProductFn={removeProduct} />
    });

    const page = {
        one: currentProducts,
        two: <AddProduct />,
        three: pastProducts
    }

    return (
        <main>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => setPageView('one')}>Manage Current Products</button>
            <button onClick={() => setPageView('two')}>Add Product</button>
            <button onClick={() => setPageView('three')}>Past Products</button>
           {page[pageView]}
        </main>
    )
}

const mapStateToProps = reduxState => {
    return{
        userReducer: reduxState.userReducer
    }
}

export default connect(mapStateToProps, {getUser})(AdminDashboard);