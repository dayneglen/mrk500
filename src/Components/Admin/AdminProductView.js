import React, {useState} from 'react';

const AdminProductView = props => {

    const { name, img_url, product_id, price, show_product } = props.product;
    const [shirtName, setShirtName] = useState(name),
          [imgUrl, setImageUrl] = useState(img_url),
          [shirtPrice, setShirtPrice] = useState(price),
          [editShirt, setEditShirt] = useState(false);

    const handleEdit = () => {
        if (editShirt) {
            props.editProductFn(product_id, price, name, img_url);
        }
        setEditShirt(!editShirt);
    }

    return (
        <main>
            <h2>{product_id}</h2>
            <img className='shirt' src={imgUrl} alt={shirtName} />
            {editShirt 
            ? <section>
                <input value={shirtName} onChange={e => setShirtName(e.target.value)} />
                <input value={imgUrl} onChange={e => setImageUrl(e.target.value)} />
                <input value={shirtPrice} onChange={e => setShirtPrice(e.target.value)} />
                <button onClick={() => props.removeProductFn(product_id)}>Remove Shirt</button>
                <button onClick={handleEdit}>Save Changes</button>
            </section>
            : <section>
                <h3>{shirtName}</h3>
                <h3>{imgUrl}</h3>
                <h3>{shirtPrice}</h3>
                {show_product 
                ? <button onClick={handleEdit}>Edit Shirt</button>
                : <button>Add Item to Store</button>}
                
            </section>}
        </main>
    )
}

export default AdminProductView;