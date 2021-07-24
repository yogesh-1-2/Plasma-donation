import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom';
import Activate from './screens/Activate.jsx';
import Register from './screens/register.jsx';
import Login from './screens/Login';
import Forget from './screens/ForgetPassword';
import PrivateRoute from './Routes/PrivateRoute';

import Private from './screens/Private.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reset from './screens/Reset';
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/"  exact render={props=> <App {...props}/>}/>
      <Route path="/register"  exact render={props=> <Register {...props}/>}/>
      <Route path="/login"  exact render={props=> <Login {...props}/>}/>
      <Route path="/users/password/forget"  exact render={props=> <Forget {...props}/>}/>
      <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
      <Route path='/users/password/reset/:token' exact render={props => <Reset {...props} />} />
      <PrivateRoute path="/private" exact component={Private} />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
  ,
  document.getElementById('root')
);