import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from '../../store/authentication';
import LoginDemoUser from './LoginDemoUser'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const loggedOut = useSelector(state => state.authentication.username);

  const loginHandler = e => {
    e.preventDefault()
    dispatch(login(username, password))
    history.push('/')
  }

  if (loggedOut) {
    return null
  }

  return (
    <div className="login-container">
      <main className="centered middled">
        <form onSubmit={loginHandler} className="Login-form">
          <input type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="input" />
          <input type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input"/>
          <button type="submit" className="form-button">Login</button>
          <LoginDemoUser />
          <div className="signup-form-login">
              <div>Dont have an account?</div><NavLink to="/signup"> Sign Up</NavLink>
          </div>
        </form>
      </main>
    </div>
  );
}

export default LoginForm
