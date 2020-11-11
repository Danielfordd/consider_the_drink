import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { logout } from '../../store/authentication';
import { reset } from '../../store/bar'

const LogoutButton = () => {
  const dispatch = useDispatch();
  const loggedOut = useSelector(state => !state.authentication.username);
  const history = useHistory()

  if (loggedOut) {
    return null;
  }

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    dispatch(reset())
  }

  return (
      <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
