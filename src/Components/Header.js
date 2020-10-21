import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {
    return (
        <header>
            <nav>
                <Link to='/login'>Login</Link>
            </nav>
            
        </header>
    )
}

export default Header;