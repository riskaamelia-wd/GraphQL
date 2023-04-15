import React from 'react';
 import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
 import { Link , useNavigate} from "react-router-dom";

 
 const Register = () => {
    const navigate = useNavigate()
   return (
     <Formik
       initialValues={{ firstName: '', lastName: '', userName:'', email: '', password:'', confirmPassword:'' }}
       validationSchema={Yup.object({
            firstName: Yup.string()
            .min(3, 'The first name must be at least 3 characters')
            .required('Required'),

            lastName: Yup.string()
            .min(3, 'The last name must be at least 3 characters')
            .required('Required'),
                        
            email: Yup.string().email('Invalid email address').required('Required'),
                        
            password: Yup.string()
            .min(8, 'The password must be at least 8 characters')
            .required('Required'),
            
            confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords don't match")
            .required('Password confirm is required'),
         
       })}

       onSubmit={(values) => {

         if(values.firstName !== "" && values.lastName !== "" && values.email !== "" && values.password !== "" && values.confirmPassword !== ""){
            navigate('/login', {replace:true})
        }

       }}
     >
        <>
        <div className='form-signin col-6 col-lg-4 m-auto'>
            <h1 className='text-center mb-4 mt-3'>Please sign up</h1>
            <Form>
                <div className='mb-3'>
                    <label htmlFor="firstName">First Name</label>
                    <Field className="form-control" name="firstName" type="text" />
                    <span className='text-danger fw-light ms-2'>
                        <ErrorMessage   name="firstName" />
                    </span>
                </div>

                <div className='mb-3'>
                    <label htmlFor="lastName">Last Name</label>
                    <Field className="form-control" name="lastName" type="text" />
                    <span className='text-danger fw-light ms-2'>
                        <ErrorMessage   name="lastName" />
                    </span>
                </div>

                <div className='mb-3'>
                    <label htmlFor="userName">User Name</label>
                    <Field className="form-control" name="userName" type="text" />
                </div>

                <div className='mb-3'>
                    <label htmlFor="email">Email Address</label>
                    <Field className="form-control" name="email" type="email" />
                    <span className='text-danger fw-light ms-2'>
                        <ErrorMessage name="email" />
                    </span>
                </div>

                <div className='mb-3'>
                    <label htmlFor="password">Password</label>
                    <Field className="form-control" name="password" type="password" />
                    <span className='text-danger fw-light ms-2'>
                        <ErrorMessage   name="password" />
                    </span>
                </div>

                <div className='mb-3'>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field className="form-control" name="confirmPassword" type="password" />
                    <span className='text-danger fw-light ms-2'>
                        <ErrorMessage   name="confirmPassword" />
                    </span>
                </div>
        
                <Link to="/login" style={{ textDecoration: "none" }}>
                    Already have an account
                </Link>
            
                <button 
                type="submit"
                className="btn btn-primary d-grid col-10 mx-auto mt-5 mb-5"
                >                   
                    Sign up
                </button>
            </Form>
        </div>
        </>
     </Formik>
   );
 };

 export default Register