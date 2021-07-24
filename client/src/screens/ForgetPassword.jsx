import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './forget.css';
const ForgetPassword = ({history}) => {
  const [formData, setFormData] = useState({
    email: '',
    textChange: 'Submit'
  });
  const { email, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/password/forget`, {
          email
        })
        .then(res => {
          
            setFormData({
              ...formData,
              email: '',
            });
            toast.success(`Please check your email`);
          
        })
        .catch(err => {
          console.log(`${process.env.REACT_APP_API_URL}/password/forget`);
        console.log(err.response);
          toast.error(err.response.data.error);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };
  return (
    <div>
    <ToastContainer/>
      <div id="cardf">
                    <div id="card-content">
                    <h1 id="heading"><b>PLASMA DONATION</b></h1>
                    <div className="underline-title"></div>
                    <form  className="form" onSubmit={handleSubmit}>
                       
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
                        <div className="form-border"></div>
                        <button className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'  
                          type="submit" 
                               >Submit</button>
                        <div className='my-6  text-center'>
                        <div className='w-7 ml-5 leading-none inline-block text-sm text-white tracking-wide font-medium transform translate-y-1/2'>
                          Or sign up
                        </div>
                      </div>
                      <div className='flex flex-col items-center'>
                        <a
                          className='w-full max-w-xs font-bold shadow-sm rounded-lg p-4
                          bg-green-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                                  href='/register'
                                  target='_self'
                                >
                                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                                  <span className='ml-4'>Sign Up</span>
                                </a>
                      </div>
                    </form>
                </div>
                </div>


    </div>
  );
};

export default ForgetPassword;