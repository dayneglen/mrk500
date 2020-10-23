import React, {useState, useEffect} from 'react';
import {ClipLoader} from 'react-spinners';
import { connect } from 'react-redux';
import { getCart } from '../redux/cartReducer';
import axios from 'axios';

const SingleProductPage = props => {
    const { id } = props.match.params,
          [shirt, setShirt] = useState({}),
          [loading, setLoading] = useState(true),
          [size, setSize] = useState('M'),
          [tall, setTall] = useState(false);

    useEffect(() => {
        axios.get(`/api/product/${id}`).then(res => {
            setShirt(res.data[0])
            setLoading(false);
        }).catch(err => console.log(err))
    }, [id])

    const handleCheckout = () => {
        axios.post(`/api/cart/${id}`, {quantity: 1, size, tall}).then(res => {
            props.getCart(res.data)
            props.history.push('/cart');
        }).catch(err => console.log(err));
    }

    const handleSize = e => {
        e === 'Regular' ? setTall(false) : setTall(true);
    }

    return (
        <main>
            
            { loading 
            ? <ClipLoader size={24} color='white' loading />
            : <img className='shirt' src={shirt.img_url} alt={shirt.name} />}
            
            <h1>{shirt.name}</h1>
            <h3>${shirt.price}</h3>
            <section>
                <h5>Size:</h5>
                <ul>
                    <li onClick={e => setSize(e.target.innerText)}>S</li>
                    <li onClick={e => setSize(e.target.innerText)}>M</li>
                    <li onClick={e => setSize(e.target.innerText)}>L</li>
                    <li onClick={e => setSize(e.target.innerText)}>XL</li>
                    <li onClick={e => setSize(e.target.innerText)}>2XL</li>
                </ul>
                <ul>
                    <li onClick={e => handleSize(e.target.innerText)}>Regular</li>
                    <li onClick={e => handleSize(e.target.innerText)}>Tall</li>
                </ul>
            </section>
            <button onClick={handleCheckout}>Add to Cart</button>
        </main>
    )
}
export default connect(null, { getCart })(SingleProductPage);
