import React from 'react';
import { Link } from 'react-router-dom';


const Product = props => {
    const { name, img_url, product_id } = props.product;
    
    return (
        <section className='shirt-display'>
            <Link to={`/shirts/${product_id}`} >
                <img className='shirt' src={img_url} alt={name} />
            </Link>
            <Link to={`/shirts/${product_id}`} >
                <h2 className='shirt-header'>{name}</h2>
            </Link>
            
        </section>
    )
}

export default Product;