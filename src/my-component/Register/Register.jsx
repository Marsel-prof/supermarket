import React from 'react';
import { useFormik } from "formik";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import * as Yup from 'yup';
import '../../assest/Login-Register.css'

function Register() {
    const navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: ""
        },
        onSubmit: async (values) => {
            let { data } = await axios.post("https://dummyjson.com/users/add", values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(data)
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Name is Required'),
            email: Yup.string().email('Invalid email address').required('Email is Required'),
            password: Yup.string().required('Password is Required')
                .matches(/^([A-Z|a-z]|[0-9]){3,}$/, 'Must Contain 8 Characters, must be Uppercase, ' +
                    'or Lowercase, or Numbers')
        })
    })

    return (
        <div className={`body`}>
            <div className="wrapper">
                <h2>Registration</h2>
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
                    <p className={`text-danger`}>{formik.errors.email}</p>
                    <div className="input-box">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter your email"
                            value={formik.values.email}
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
                                Register
                            </button>
                        </div>
                        <div>
                            <h3 className="mt-2">
                                Already have an account? <Link to="/login">Login</Link>
                            </h3>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;