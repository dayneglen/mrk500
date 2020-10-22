import React, {useState} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const AddProduct = props => {
    
    const [name, setName] = useState(''),
          [imgUrl, setUrl] = useState(''),
          [price, setPrice] = useState(''),
          [productAdded, setProductAdded] = useState(false);

    const handleAddProduct = e => {
        e.preventDefault();
        axios.post('/api/product', {name, price, img_url: imgUrl}).then(_ => {
            setTimeout(() => {
                setProductAdded(true);
            }, 3000);
            setProductAdded(false);
        }).catch(err => console.log(err));
    }

    return (
        <form>
            <h1>Add Shirt</h1>
            <div className='img-preview'></div>
            <input placeholder='Shirt Name' value={name} onChange={e => setName(e.target.value) } />
            <input placeholder='Image Url' value={imgUrl} onChange={e => setUrl(e.target.value)} />
            <input placeholder='Price' value={price} onChange={e => setPrice(e.target.value)} />
            <button onClick={handleAddProduct}>Add Shirt</button>
            {productAdded
            ? <h4>Shirt Successfully Added</h4>
            : null}
        </form>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer
    }
}

export default connect(mapStateToProps)(AddProduct);