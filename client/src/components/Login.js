import React, {useState} from 'react';
import axios from 'axios';
import '../utility/util.css';

const Login = (props) => {
  const [type, setType] = useState('login');
  const [login, setLogin] = useState({});
  const [response, setResponse] = useState('');

  const updateLogin = event => {
    const loginData = login;
    loginData[event.target.id] = event.target.value;
    setLogin(loginData);
  }

  const toggleScreen = () => {
    setLogin({username: '', password: ''});
    setResponse('');
    if(type==='login') {
      setType('create');
    } else {
      setType('login');
    }
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

  const createUser = event => {
    event.preventDefault();
    if(login.password !== login.repeatPassword) {
      setResponse('pass');
    } else {
      const {repeatPassword, ...newUser} = login;
      axios.post('/api/auth/createUser', newUser)
        .then(response => {
            if(response.data instanceof Object) {
              props.setUser(response.data);
              props.history.goBack();
            } else {
              setResponse('user');
            }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  return (
    <div data-testid='login' className='login'>
      {type === 'login' &&
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
            <button className='btn btn-link text-center' onClick={toggleScreen}>Create an account</button>
          </div>
        </form>
      }
      {type==='create' &&
        <form className="form-signin" onSubmit={createUser}>
          <div className="text-center mb-4">
            <h2>Create Account</h2>
          </div>
          <div className="form-label-group">
            <input type="text" id="username" className="form-control" placeholder="Username"
              onChange={updateLogin} defaultValue={login.username}/>
            <label htmlFor="username">Username</label>
          </div>
          {response === 'user' &&
            <div className="text-center alert alert-danger" role="alert">
              User already exists with that username
            </div>
          }
          <div className="form-label-group">
            <input type="email" id="email" className="form-control" placeholder="Email"
              onChange={updateLogin} defaultValue={login.email}/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-label-group">
            <input type="password" id="password" className="form-control" placeholder="Password"
              onChange={updateLogin} defaultValue={login.password}/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="form-label-group">
            <input type="password" id="repeatPassword" className="form-control" placeholder="Repeat Password"
              onChange={updateLogin} defaultValue={login.repeatPassword}/>
            <label htmlFor="repeatPassword">Repeat Password</label>
          </div>
          {response === 'pass' &&
            <div className="text-center alert alert-danger" role="alert">
              Passwords do not match
            </div>
          }
          <button className="btn btn-lg btn-primary btn-block mb-2" type="submit">Create Account</button>
          <div className='text-center'>
            <button className='btn btn-link text-center' onClick={toggleScreen}>Already have an account?</button>
          </div>
        </form>
      }
    </div>
  );
}

export default Login;
