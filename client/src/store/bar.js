const LOAD_USER_BAR = 'ctd/bar/LOAD_USER_BAR'
const LOAD_USER_FAVORITES = 'ctd/bar/LOAD_USER_FAVORITES'


const load_bar = (bar) => {
    return {
        type: LOAD_USER_BAR,
        bar
    }
}

const load_favs = (favorites) => {
    return {
        type: LOAD_USER_FAVORITES,
        favorites
    }
}

export const load_mybar = () => async dispatch => {
    const user = localStorage.getItem('token');
    const payload = user.split(".")[1];
    const decodedPayload = atob(payload);
    const payloadObj = JSON.parse(decodedPayload);
    const response = await fetch(`/api/user/userbar/${payloadObj.user_id}`)

    if (response.ok) {
        const userbar = await response.json()
        dispatch(load_bar(userbar.userbar))
    }
}

export const load_favorites = () => async dispatch => {
    const user = localStorage.getItem('token');
    const payload = user.split(".")[1];
    const decodedPayload = atob(payload);
    const payloadObj = JSON.parse(decodedPayload);
    const response = await fetch(`/api/user/favorites/${payloadObj.user_id}`)

    if (response.ok) {
        const userbar = await response.json()
        dispatch(load_favs(userbar.favorites))
    }
}

export default function reducer(state={userBar:[], favorites:[]}, action) {
    let newState;
    switch (action.type) {
      case LOAD_USER_BAR:
          newState = {...state}
          newState.userBar = action.bar
          return newState
      case LOAD_USER_FAVORITES:
          newState = {...state}
          newState.favorites = action.favorites
          return newState
      default:
        return state;
    }
  }
