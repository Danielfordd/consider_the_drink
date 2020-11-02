import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authentication';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const loggedOut = useSelector(state => !state.authentication.username);

  if (loggedOut) {
    return null;
  }

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
      <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
