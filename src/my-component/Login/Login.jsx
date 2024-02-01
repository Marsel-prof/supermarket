import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import * as Yup from "yup";

function Login() {
    const navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            identifier: '',
            password: ''
        },
        onSubmit: async (values) => {
            let { data } = await axios.post("http://localhost:1337/api/auth/local",values)
            localStorage.setItem("token", data.jwt)
            navigate('/home')
        }
        ,
        validationSchema: Yup.object({
            identifier: Yup.string()
                .email('Invalid email address')
                .required('Email is Required'),
            password: Yup.string()
                .required('Password is Required')
                .matches(/^([A-Z|a-z]|[0-9]){3,}$/, 'Must Contain 8 Characters, must be Uppercase, ' +
                    'or Lowercase, or Numbers')
        })
    })
    return (
        <div className={`body`}>
            <div className="wrapper">
                <h2>Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <p className={`text-danger`}>{formik.errors.identifier}</p>
                    <div className="input-box">
                        <input
                            type="email"
                            className="form-control"
                            name="identifier"
                            placeholder="Enter your email"
                            value={formik.values.identifier}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <p className={`text-danger`}>{formik.errors.password}</p>
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
