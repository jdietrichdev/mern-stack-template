import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { ROUTES } from './utility/constants';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import { isElementOfType } from 'react-dom/test-utils';

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get('/api/auth/checkToken')
      .then(res => {
        if(res.data instanceof Object) {
          setUser(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route exact path={ROUTES.HOME} render={routeProps => {
          return <Home user={user} {...routeProps} />
        }} />
        <Route path={ROUTES.LOGIN} render={routeProps => {
          return <Login user={user} setUser={setUser} {...routeProps} />
        }} />
      </Switch>
    </Router>
  );
}

export default App;
