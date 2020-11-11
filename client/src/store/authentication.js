const SET_USER = "ctd/authentication/SET_USER";
const REMOVE_USER = "ctd/authentication/REMOVE_USER";

const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const response = await fetch(`/api/auth/token-auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const user = await response.json();
      localStorage.setItem('token', user.token);
      const payload = user.token.split(".")[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);

      dispatch(setUser(payloadObj));
    }
  };
};

export const signup = (first_name, last_name, username, email, password) => async dispatch => {
    const response = await fetch(`/api/auth/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({first_name, last_name, username, email, password}),
    });

    if (response.ok) {

      const user = await response.json();
      localStorage.setItem('token', user.token);
      const payload = user.token.split(".")[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      dispatch(setUser(payloadObj));
    }
}

export const logout = () => async dispatch => {
  localStorage.removeItem('token');
  dispatch(removeUser());
}


function loadUser() {
  const authToken = localStorage.getItem("token");

  if (authToken) {
    try {
      const payload = authToken.split(".")[1];

      const decodedPayload = atob(payload);

      const payloadObj = JSON.parse(decodedPayload);
      return payloadObj
    } catch (e) {
      localStorage.removeItem("token")
    }
  }
  return {user_id: false, username: "", exp: false, email: "" };
}

export default function reducer(state=loadUser(), action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      // newState = {...state}
      // newState.username = action.user
      return action.user
    case REMOVE_USER:
      return {user_id: false, username: "", exp: false, email: "" };
    default:
      return state;
  }
}
