import React from 'react';
import { Link } from 'react-router-dom';

const Select = () => {
    
    return (
        <div className="container mt-5 text-center">
            <h3>Select a user First</h3>
            <Link to="/">
                <button className="btn btn-primary">User Table</button>
            </Link>
        </div>
    );
};

export default Select;
