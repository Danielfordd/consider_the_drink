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
      <div className="login-img">
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/americano.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/black_russian+(1).png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/zombie.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/rusty_nail.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/bloody_mary.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/julep.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/kir_royale.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/Tropical.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/tom_collins.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/sunrise.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/sidecar.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/Sazerac.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/moscow_mule.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/long_island.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/grasshopper.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/brooklyn.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/whiskey_sour.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/ti_punch.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/Negroni.png" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/tuxedo.png" />
      </div>
      <main className="login-sidebar">
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
          <button type="submit" className="form-button centered">Login</button><span> |</span>
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
