import React, {useState, useEffect} from 'react';
import {ClipLoader} from 'react-spinners';
import axios from 'axios';

const SingleProductPage = props => {
    const { id } = props.match.params,
          [shirt, setShirt] = useState({}),
          [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/product/${id}`).then(res => {
            setShirt(res.data[0])
            setLoading(false);
        }).catch(err => console.log(err))
    }, [id])

    const handleCheckout = () => {
        props.history.push('/cart');
    }

    return (
        <main>
            
            { loading 
            ? <ClipLoader size={24} color='white' loading />
            : <img className='shirt' src={shirt.img_url} alt={shirt.name} />}
            
            <h1>{shirt.name}</h1>
            <h3>{shirt.price}</h3>
            <section>
                <h5>Size:</h5>
                <ul>
                    <li>S</li>
                    <li>M</li>
                    <li>L</li>
                    <li>XL</li>
                    <li>2XL</li>
                </ul>
            </section>
            <button onClick={handleCheckout}>Add to Cart</button>
        </main>
    )
}

export default SingleProductPage;