import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../utility/util.css';

const Register = props => {
  const [register, setRegister] = useState({});
  const [response, setResponse] = useState('');

  const updateRegister = event => {
    const registerData = register;
    registerData[event.target.id] = event.target.value;
    setRegister(registerData);
  }

  const createUser = event => {
    event.preventDefault();
    if(register.password !== register.repeatPassword) {
      setResponse('pass');
    } else {
      const {repeatPassword, ...newUser} = register;
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
        });
    }
  }

  return (
    <form data-testid='register' className="form-signin" onSubmit={createUser}>
      <div className="text-center mb-4">
        <h2>Register</h2>
      </div>
      <div className="form-label-group">
        <input type="text" id="username" className="form-control" placeholder="Username"
          onChange={updateRegister} defaultValue={register.username}/>
        <label htmlFor="username">Username</label>
      </div>
      {response === 'user' &&
        <div className="text-center alert alert-danger" role="alert">
          User already exists with that username
        </div>
      }
      <div className="form-label-group">
        <input type="email" id="email" className="form-control" placeholder="Email"
          onChange={updateRegister} defaultValue={register.email}/>
        <label htmlFor="email">Email</label>
      </div>
      <div className="form-label-group">
        <input type="password" id="password" className="form-control" placeholder="Password"
          onChange={updateRegister} defaultValue={register.password}/>
        <label htmlFor="password">Password</label>
      </div>
      <div className="form-label-group">
        <input type="password" id="repeatPassword" className="form-control" placeholder="Repeat Password"
          onChange={updateRegister} defaultValue={register.repeatPassword}/>
        <label htmlFor="repeatPassword">Repeat Password</label>
      </div>
      {response === 'pass' &&
        <div className="text-center alert alert-danger" role="alert">
          Passwords do not match
        </div>
      }
      <button className="btn btn-lg btn-primary btn-block mb-2" type="submit">Create Account</button>
      <div className='text-center'>
        <Link className='btn btn-link text-center' to='/login'>Already have an account?</Link>
      </div>
    </form>
  )
}

export default Register;