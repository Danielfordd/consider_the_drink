import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signup } from '../../store/authentication'

const SignupForm = () => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const loggedOut = useSelector(state => state.authentication.username);

  const SignupHandler = e => {
    e.preventDefault()
    dispatch(signup(firstName, lastName, userName,email, password))
  }

  if (loggedOut) {
       return null;
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
      </div>
    <main className="login-sidebar">
       <form onSubmit={SignupHandler}>
              <input type="text"
                     placeholder="First Name"
                     value={firstName}
                     onChange={e => setFirstName(e.target.value)}
                     className="input"/>
              <input type="text"
                     placeholder="Last Name"
                     value={lastName}
                     onChange={e => setLastName(e.target.value)}
                     className="input"/>
              <input type="text"
                     placeholder="User Name"
                     value={userName}
                     onChange={e => setUserName(e.target.value)}
                     className="input"/>
              <input type="text"
                     placeholder="Email"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                     className="input"/>
              <input type="password"
                     placeholder="Password"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     className="input"/>
              <input type="password"
                     placeholder="Confirm Password"
                     value={confirmPassword}
                     onChange={e => setConfirmPassword(e.target.value)}
                     className="input"/>
              <button type="submit" className="form-button centered">Sign Up</button>
              <div className="signup-form-login">
                <div>Already have an account?</div><NavLink to="/login"> Login</NavLink>
              </div>
       </form>
    </main>
    </div>
  );
}

export default SignupForm
