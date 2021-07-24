import React, { useState } from 'react';
//import authSvg from '../assests/auth.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth.js';
import { Link, Redirect } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
    textChange: 'Sign Up'
  });

  const { name, email, password1, password2, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: 'Submitting' });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name,
            email,
            password: password1
          })
          .then(res => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Submitted'
            });

            toast.success(res.data.message);
          })
          .catch(err => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Sign Up'
            });
            console.log(err);
            toast.error(err.response.data.errors);
          });
      } else {
        console.log("passwords not matching");
        toast.error("Passwords don't matches");
      }
    } else {
      console.log("all fields not filled");
      toast.error('Please fill all fields');
    }
  };

  return (
    <div>
      {isAuth()?<Redirect to='/'/>: null}
    <ToastContainer/>
      <div id="card">
                    <div id="card-content">
                    <h1 id="heading"><b>PLASMA DONATION</b></h1>
                    <div className="underline-title"></div>
                    <form  className="form" onSubmit={handleSubmit}>
                        <label htmlFor="user-name" style={ {paddingTop: '13px'} }>
                            &nbsp;Name
                        </label>
                        <input 
                          id="user-name" 
                          className="form-content" 
                          type="text" 
                          placeholder="name"
                          onChange={ handleChange('name')}
                          value={name}
                         // autoComplete="on" 
                         // required
                          />
                        <label htmlFor="user-email" style={ {paddingTop: '13px'} }>
                            &nbsp;Email
                        </label>
                        <input 
                          id="user-email" 
                          className="form-content" 
                          type="email" 
                          placeholder="Email"
                          onChange={ handleChange('email')}
                          value={email}
                         // autoComplete="on" 
                         // required
                          />
                        <label htmlFor="password1" style={ {paddingTop: '13px'} }>
                            &nbsp;Password
                        </label>
                        <input 
                          id="user-password" 
                          className="form-content" 
                          type="password" 
                          placeholder="Password"
                          onChange={ handleChange('password1')}
                          value={password1}
                         // autoComplete="on" 
                        //  required
                          />
                        <label htmlFor="password2" style={ {paddingTop: '13px'} }>
                            &nbsp;Confirm Password
                        </label>
                        <input 
                          id="user-cpassword" 
                          className="form-content" 
                          type="password" 
                          placeholder="Confirm Password"
                          onChange={ handleChange('password2')}
                          value={password2}
                         // autoComplete="on" 
                          //required
                          />
                        <div className="form-border"></div>
                        <button className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'  
                          type="submit" 
                               >Register</button>
                        <div className='my-6  text-center'>
                        <div className='w-7 ml-5 leading-none inline-block text-sm text-white tracking-wide font-medium transform translate-y-1/2'>
                          Or sign with email or social login
                        </div>
                      </div>
                      <div className='flex flex-col items-center'>
                        <a
                          className='w-full max-w-xs font-bold shadow-sm rounded-lg p-4
                          bg-green-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                                  href='/login'
                                  target='_self'
                                >
                                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                                  <span className='ml-4'>Sign In</span>
                                </a>
                      </div>
                    </form>
                </div>
                </div>


    </div>
  )
  //return "register";
}
export default Register;
