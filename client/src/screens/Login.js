import React, { useState } from 'react';
//import authSvg from '../assests/auth.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth.js';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import './login.css';


const Login = ({history}) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: ''
  });
  const sendGoogleToken = tokenId => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };
  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/private');
    });
  };

  const responseGoogle = response => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
        userID,
        accessToken
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };
  const responseFacebook = response => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken)
  };

  const { email, password1 } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (email && password1) {
        setFormData({ ...formData, textChange: 'Submitting' });
        axios
          .post(`${process.env.REACT_APP_API_URL}/login`, {
            email,
            password: password1
          })
          .then(res => {
              authenticate(res,()=>{
                  setFormData({
              ...formData,
              email: '',
              password1: ''
            });
            toast.success(res.data.message);
              })
              isAuth() && isAuth().role === 'admin'
              ? history.push('/admin')
              : history.push('/private');
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
          })
          .catch(err => {
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'Sign In'
            });
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
    } else {
      console.log("all fields not filled");
      toast.error('Please fill all fields');
    }
  };

  return (
    <div>
    {isAuth()?<Redirect to='/'/>: null}
    <ToastContainer/>
      <div id="cardl">
                    <div id="card-content">
                    <h1 ><b>PLASMA DONATION</b></h1>
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
                          
                        <div className="form-border"></div>
                        <Link
                          to='/users/password/forget'
                        >
                          <legend id="forgot-pass">Forgot password?</legend>
                        </Link>        
                        <button className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'  
                          type="submit" 
                               >Login</button>

              <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className='my-4 w-full max-w-xs font-bold shadow-sm rounded-lg py-1 bg-red-600 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-google ' />
                      </div>
                      <span className='ml-4'>Sign In with Google</span>
                    </button>
                  )}
                ></GoogleLogin>
                <FacebookLogin
                  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                  autoLoad={false}
                  callback={responseFacebook}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      className='my-4 w-full max-w-xs font-bold shadow-sm rounded-lg py-1 bg-indigo-500 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-facebook' />
                      </div>
                      <span className='ml-4'>Sign In with Facebook</span>
                    </button>
                  )}
                />

                          <div className="form-border"></div>
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
  )
  //return "register";
}
export default Login;
