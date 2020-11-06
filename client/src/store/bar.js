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

export const load_mybar = (id) => async dispatch => {
    const response = await fetch(`/api/user/userbar/${id}`)

    if (response.ok) {
        const userbar = await response.json()
        dispatch(load_bar(userbar.userbar))
    }
}

export const load_favorites = (id) => async dispatch => {
    const response = await fetch(`/api/user/favorites/${id}`)

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
