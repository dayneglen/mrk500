import React, {useState, useEffect} from 'react';
import {ClipLoader} from 'react-spinners';
import { connect } from 'react-redux';
import { getCart } from '../../redux/cartReducer';
import axios from 'axios';

const SingleProductPage = props => {
    const { id } = props.match.params,
          [shirt, setShirt] = useState({}),
          [loading, setLoading] = useState(true),
          [size, setSize] = useState('M'),
          [tall, setTall] = useState(false),
          [activeSize, setActiveSize] = useState('M'),
          [activeLength, setActiveLength] = useState('Regular')

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

    const handleSizeClick = e => {
        setSize(e.target.innerText)
        setActiveSize(e.target.innerText);
    }

    const handleSize = e => {
        e.target.innerText === 'Regular' ? setTall(false) : setTall(true);
        setActiveLength(e.target.innerText);
    }

    const shirtStyle = {
        backgroundImage: `url(${shirt.img_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const selectedShirt = {
        backgroundColor: "#515151",
        color: 'white'
    }

    return (
        <main>
            
            { loading 
            ? <ClipLoader size={24} color='black' loading />
            : 
            <section className='single-product-container'>
                    <div style={shirtStyle}></div>
                    
                    <section className='size-container'>
                        <h1>{shirt.name}</h1>
                        <h3>${shirt.price}</h3>
                        <h5>Size:</h5>
                        <ul className='sizes'>
                            <li style={activeSize === 'S' ? selectedShirt : null} onClick={e => handleSizeClick(e)}>S</li>
                            <li style={activeSize === 'M' ? selectedShirt : null} onClick={e => handleSizeClick(e)}>M</li>
                            <li style={activeSize === "L" ? selectedShirt : null} onClick={e => handleSizeClick(e)}>L</li>
                            <li style={activeSize === 'XL' ? selectedShirt : null} onClick={e => handleSizeClick(e)}>XL</li>
                            <li style={activeSize === '2XL' ? selectedShirt : null} onClick={e => handleSizeClick(e)}>2XL</li>
                        </ul>
                        <ul className='sizes length'>
                            <li style={activeLength === 'Regular' ? selectedShirt : null} onClick={e => handleSize(e)}>Regular</li>
                            <li style={activeLength === 'Tall' ? selectedShirt : null} onClick={e => handleSize(e)}>Tall</li>
                        </ul>
                        <button className='btn blue-green-btn'  onClick={handleCheckout}>Add to Cart</button>
                    </section>
                   
                </section>
            
            }


            
            
              
        </main>
    )
}
export default connect(null, { getCart })(SingleProductPage);
