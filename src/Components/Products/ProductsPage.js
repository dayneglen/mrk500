import React, {useState, useEffect} from 'react';
import Product from './Product';
import axios from 'axios';

const ProductsPage = props => {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then(res => {
            setProductList([...res.data]);
        }).catch(err => console.log(err))
    }, [])

    const products = productList.map((product, i) =>  <Product key={i} product={product} />);
    return (
        <main>
            {products}
        </main>
    )
}

export default ProductsPage;