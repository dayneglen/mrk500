import React from 'react';
import { Link } from 'react-router-dom';


const Product = props => {
    const { name, img_url, product_id, price } = props.product;

    const shirtStyle = {
        backgroundImage: `url(${img_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    
    return (
        <section className='shirt-display'>
            <section>
                <Link to={`/shirts/${product_id}`} >
                    <div  className='shirt' style={shirtStyle}></div>
                </Link>
            </section>
            <section className='product-info'>
                <section className='product-info-container'>
                    <Link to={`/shirts/${product_id}`} >
                        <h2 className='shirt-header'>{name}</h2>
                    </Link>
                    <h2 className='price'>${price}</h2>
                </section>
                
            </section>
            
            
        </section>
    )
}

export default Product;