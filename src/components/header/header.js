import React from 'react';
import {Link} from 'react-router-dom'
import './header.css'

const Header = () => {
    return (
        <div className='header-block d-flex justify-content-between align-items-center'>
            <h2>
                <Link to='/'>Game of Thrones DB</Link>
            </h2>
            <div className='header-links d-flex justify-content-around'>
                <li>
                    <Link to='/characters'>Characters</Link>
                </li>
                <li>
                    <Link to='/houses'>Houses</Link>
                </li>
                <li>
                    <Link to='/books'>Books</Link>
                </li>
                
                
                
            </div>
        </div>
    )
}

export default Header;