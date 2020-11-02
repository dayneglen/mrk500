import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AdminProductView from './AdminProductView';
import AddProduct from './AddProduct';
import SubscriberEmail from './SubscriberEmail';
import { getUser } from '../../redux/userReducer';

const AdminDashboard = props => {
    const [productList, setProductList] = useState([]),
          [pageView, setPageView] = useState('one'),
          [activePage, setActivePage] = useState('one'),
          [subscriberList, setSubscriberList] = useState([]);

    useEffect(() => {
        if (!props.userReducer.user.is_admin) {
            props.history.push('/');
        }
        getProductList();
        getSubscriberList();
    }, [pageView])

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

    const getSubscriberList = () => {
        axios.get('/api/newsletter/emails').then(res => {
            setSubscriberList([...res.data]);
        }).catch(err => console.log(err));
    }

    const removeProduct = id => {
        axios.put(`/api/product/remove/${id}`).then(() => {
            getProductList();
        }).catch(err => console.log(err))
    }

    const returnProduct = id => {
        axios.put(`/api/product/add/${id}`).then(() => {
            setPageView('one');
            setActivePage('one');
        }).catch(err => console.log(err))
    }

    const editProduct = (id, price, name, img_url) => {
        axios.put(`/api/product/${id}`, {name, price, img_url}).then(_ => {
            getProductList();
        }).catch(err => console.log(err));
    }

    const deleteEmail = id => {
        axios.delete(`/api/newsletter/email/${id}`).then(_ => {
            getSubscriberList();
        }).catch(err => console.log(err));
    }

    const handlePageView = currentPageView => {
        setPageView(currentPageView);
        setActivePage(currentPageView);
    }

    const currentProducts = productList.map((product, i) => {
        return product.show_product 
            ? <AdminProductView key={i} product={product} removeProductFn={removeProduct} editProductFn={editProduct}/>
            : null
    });

    const pastProducts = productList.map((product, i) => {
        return product.show_product
            ? null
            : <AdminProductView key={i} product={product} returnProductFn={returnProduct}removeProductFn={removeProduct} />
    });

    const emailSubscribers = subscriberList.map((email, i) => {
        return <SubscriberEmail key={i} subscriberEmail={email} deleteEmailFn={deleteEmail} />
    });

    const page = {
        one: currentProducts,
        two: <AddProduct handlePageViewFn={handlePageView} />,
        three: pastProducts,
        four: emailSubscribers
    }

    const activePageStyle = {
        backgroundColor: 'rgb(212, 211, 211)',
        color: '#000'
    }

    return (
        <main className='main-dashboard'>
            <section className='admin-menu-container'>
                <nav className='admin-btn-container'>
                    <button style={activePage === 'one' ? activePageStyle : null} onClick={() => handlePageView('one')}>Manage Current Products</button>
                    <button style={activePage === 'two' ? activePageStyle : null} onClick={() => handlePageView('two')}>Add Product</button>
                    <button style={activePage === 'three' ? activePageStyle : null} onClick={() => handlePageView('three')}>Past Products</button>
                    <button style={activePage === 'four' ? activePageStyle : null} onClick={() => handlePageView('four')}>Manage Subscribers</button>
                    <button onClick={handleLogout}>Logout</button>
                </nav>  
            </section>
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