import React from 'react';
import { useFormik } from 'formik';
import { Link, Navigate, useNavigate } from "react-router-dom";

const validate = values => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Your password must be at least 8 characters';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const Login = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        },
        
        validate,
        onSubmit: values => {
            if(values.email !== "" && values.email !== ""){
                // alert(JSON.stringify(values, null, 2));
                console.log(email);
                navigate('/create', {replace:true})
            }
        },
    });

    return (
        <div className='form-signin col-6 col-lg-4 m-auto'>
            <h1 className='text-center mb-4'>Please sign in</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className='form-control'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? <div className='text-danger fw-light '>{formik.errors.email}</div> : null}
                </div>
                <div className='mb-3'>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className='form-control'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ? <div className='text-danger fw-light'>{formik.errors.password}</div> : null}
                </div>

            <button 
                type="submit"
                className="btn btn-primary d-grid col-10 mx-auto mt-5 mb-3"
            >
                Sign in
            </button>

            <Link to="/register" style={{ textDecoration: "none" }}>
                Create new account
            </Link>
            </form>
        </div>
    );
};
export default Login