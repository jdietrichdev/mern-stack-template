import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = props => {
  const logout = () => {
    props.setUser();
    axios.get('/api/auth/logout')
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <nav data-testid='header' className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' to='/'>Josh Dietrich</Link>

      <ul className='navbar-nav ml-auto'>
        {!props.user &&
          <li className='nav-item'>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
          </li>
        }
        {props.user &&
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {props.user.username}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <button className="dropdown-item" onClick={logout}>Logout</button>
            </div>
          </li>
        }
      </ul>
    </nav>
  );
}

export default Header;