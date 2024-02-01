import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/Service/auth/userToken";

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(({userToken}) =>userToken); // Subscribe to the user state

    const saveUser = () => {
        let token = localStorage.getItem('token');
        if (token) {
            let decode = jwtDecode(token);
            dispatch(setUser(decode));
            console.log(decode);
        } else {
            console.log('Token is not present in localStorage');
        }
    };
    useEffect(() => {
        if (localStorage.getItem('token')) {
            saveUser();
        }
    }, []);
    const logout = () => {
        localStorage.removeItem('token');
        dispatch(setUser(null));
        navigate('/login')
    }


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Super Market</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/product">Product</Link>
                        </li>
                        {user?
                        <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart</Link>
                        </li>
                        </>: ''
                        }
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                Dropdown link
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {user == null ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={logout}>Logout</a>
                                </li>
                            </>}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
