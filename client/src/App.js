import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import LoginForm from './components/authentication/LoginForm'
import SignUpForm from './components/authentication/SignUpForm'
import LogoutButton from './components/authentication/LogoutButton'
import LoginDemoUser from './components/authentication/LoginDemoUser'


function App() {

  return (
    <BrowserRouter>
        <nav>
            <ul>
                <li><NavLink to="/" activeclass="active">Home</NavLink></li>
            </ul>
        </nav>
        <Switch>
            <Route path="/">
                <h1>My Home Page</h1>
                <LoginForm />
                <SignUpForm />
                <LogoutButton />
                <LoginDemoUser />
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
