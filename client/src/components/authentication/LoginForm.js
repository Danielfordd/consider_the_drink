import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
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
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/americano.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/black_russian+(1).png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/zombie.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/rusty_nail.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/bloody_mary.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/julep.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/kir_royale.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/Tropical.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/tom_collins.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/sunrise.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/sidecar.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/Sazerac.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/moscow_mule.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/long_island.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/grasshopper.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/brooklyn.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/whiskey_sour.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/ti_punch.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/Negroni.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/tuxedo.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/aviation.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/bramble.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/cosmo.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/champagne.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/cranberry.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/crusta.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/grasshopper.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/martinez.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/martini_dirty.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/mimosa.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/mojito.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/screwdriver.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/white_russian.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/sotb.png" alt="cocktail" />
        <img src="https://considerthedrink.s3.us-east-2.amazonaws.com/old_fashioned.png" alt="cocktail" />
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
