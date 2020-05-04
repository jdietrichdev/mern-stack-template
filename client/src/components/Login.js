import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../utility/util.css';

const Login = props => {
  const [login, setLogin] = useState({});
  const [response, setResponse] = useState('');

  const updateLogin = event => {
    const loginData = login;
    loginData[event.target.id] = event.target.value;
    setLogin(loginData);
  }

  const loginUser = event => {
    event.preventDefault();
    axios.post('/api/auth/authenticate', login)
      .then(response => {
        if(typeof response.data === 'object') {
          props.setUser(response.data);
          props.history.goBack();
        } else {
          setResponse('user');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className='login' data-testid='login'>
      <form className="form-signin" onSubmit={loginUser}>
        <div className="text-center mb-4">
          <h2>Login</h2>
        </div>
        <div className="form-label-group">
          <input type="text" id="username" className="form-control" placeholder="Username"
            onChange={updateLogin} defaultValue={login.username} />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-label-group">
          <input type="password" id="password" className="form-control" placeholder="Password"
            onChange={updateLogin} defaultValue={login.password} />
          <label htmlFor="password">Password</label>
        </div>
        {response === 'user' &&
          <div className="text-center alert alert-danger" role="alert">
            No user found or incorrect password
          </div>
        }
        <button className="btn btn-lg btn-primary btn-block mb-2" type="submit">Sign in</button>
        <div className='text-center'>
          <Link className='btn btn-link text-center' to='/register'>Create an account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
