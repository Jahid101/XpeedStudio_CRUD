import React from 'react';
import { Link } from "react-router-dom";


const Navbar = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-success m-1 rounded fw-bold">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3" to="/">XpeedStudio CRUD</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav" style={{marginLeft:'28%'}}>
                            <li className="nav-item">
                                <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light" to="/create">Create</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light" to="/update">update</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
