import React, {useState} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const AddProduct = props => {
    
    const [name, setName] = useState(''),
          [imgUrl, setUrl] = useState(''),
          [price, setPrice] = useState('');

    const handleAddProduct = e => {
        e.preventDefault();
        axios.post('/api/product', {name, price, img_url: imgUrl}).then(_ => {
            props.handlePageViewFn('one');
        }).catch(err => console.log(err));
    }

    const imgStyle = {
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return (
        <form className='add-form'>
            <h1>Add Shirt</h1>
            <div style={imgStyle} className='img-preview'></div>
            <input placeholder='Shirt Name' value={name} onChange={e => setName(e.target.value) } />
            <input placeholder='Image Url' value={imgUrl} onChange={e => setUrl(e.target.value)} />
            <input placeholder='Price' value={price} onChange={e => setPrice(e.target.value)} />
            <button className='btn' onClick={handleAddProduct}>Add Shirt</button>
        </form>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer
    }
}

export default connect(mapStateToProps)(AddProduct);