import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import * as Yup from "yup";

function Login() {
    const navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            username: 'kminchelle',
            password: '0lelplR'
        },
        onSubmit: async (values) => {
            try {
                let { data } = await axios.post('https://dummyjson.com/auth/login', values, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                localStorage.setItem("token",data.token)
                navigate('/home');
            } catch (error) {
                console.error('Login failed:', error);
            }
        }

    })
    return (
        <div className={`body`}>
            <div className="wrapper">
                <h2>Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <p className={`text-danger`}>{formik.errors.username}</p>
                    <div className="input-box">
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Enter your name"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                    </div>
                        <p className={`text-danger`}>{formik.errors.password}</p>
                    <div className="input-box">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Enter your password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-success mt-4">
                                Login
                            </button>
                        </div>
                        <div>
                            <h3 className="mt-2">
                                don't have an account? <Link to="/register">Register</Link>
                            </h3>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
