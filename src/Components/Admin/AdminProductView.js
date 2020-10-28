import React, { useState } from 'react';

const AdminProductView = props => {

    const { name, img_url, product_id, price, show_product } = props.product;
    const [shirtName, setShirtName] = useState(name),
        [imgUrl, setImageUrl] = useState(img_url),
        [shirtPrice, setShirtPrice] = useState(price),
        [editShirt, setEditShirt] = useState(false);

    const handleEdit = () => {
        if (editShirt) {
            console.log('hit')
            props.editProductFn(product_id, shirtPrice, shirtName, imgUrl);
        }
        setEditShirt(!editShirt);
    }

    const shirtStyle = {
        backgroundImage: `url(${img_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }


    return (
        <main className='manage-products-page'>

            <section className='admin-id-img'>
                <h2>Product Id: {product_id}</h2>
                <div className='shirt' style={shirtStyle}></div>
            </section>
            {editShirt
                ? <section className='edit-product-container'>
                    <input value={shirtName} onChange={e => setShirtName(e.target.value)} />
                    <input value={imgUrl} onChange={e => setImageUrl(e.target.value)} />
                    <input value={shirtPrice} onChange={e => setShirtPrice(e.target.value)} />
                    <button className='btn' onClick={() => props.removeProductFn(product_id)}>Remove Shirt</button>
                    <button className='btn' onClick={handleEdit}>Save Changes</button>
                </section>
                : <section className='admin-product-info-container'>
                    <h3><span>Name:</span> {shirtName}</h3>
                    <h3><span>Image Url:</span> {imgUrl}</h3>
                    <h3><span>Price</span>: ${shirtPrice}</h3>
                    {show_product
                        ? <button className='btn' onClick={handleEdit}>Edit Shirt</button>
                        : <button className='btn'>Add Item to Store</button>}
                </section>}


        </main>
    )
}

export default AdminProductView;