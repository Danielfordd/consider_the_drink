import Cookies from "js-cookie";

const LOAD_USER_BAR = 'ctd/bar/LOAD_USER_BAR'
const LOAD_USER_FAVORITES = 'ctd/bar/LOAD_USER_FAVORITES'
const RESET_USER_BAR_FAVORITES = 'ctd/bar/RESET_USER_BAR_FAVORITES'
const REMOVE_INGREDIENT_FROM_BAR = 'ctd/bar/REMOVE_INGREDIENT_FROM_BAR'
const ADD_INGREDIENT_TO_MYBAR = 'ctd/bar/ADD_INGREDIENT_TO_MYBAR'

const add_ing_mybar = (ingredient) => {
    return {
        type:ADD_INGREDIENT_TO_MYBAR,
        ingredient
    }
}

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

const remove_ing = (ing) => {
    return {
        type:REMOVE_INGREDIENT_FROM_BAR,
        ing
    }
}

export const addIngredientToMyBar = (ingredient) => async dispatch => {
    const csrftoken = Cookies.get('csrftoken');
    const user = localStorage.getItem('token');
    if (user === null) {
        dispatch(reset())
        return
    }
    const payload = user.split(".")[1];
    const decodedPayload = atob(payload);
    const payloadObj = JSON.parse(decodedPayload);
    const response = await fetch("/api/user/userbar/ingredients/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': csrftoken
      },
      body: JSON.stringify({'ingredient': ingredient, 'userId':payloadObj.user_id })
    })

    if (response.ok) {
        const { addedIngredient } = await response.json()
        console.log(addedIngredient)
        dispatch(add_ing_mybar(addedIngredient))
    }
}

export const removeIngredientFromBar = (ing) => async dispatch => {
    const csrftoken = Cookies.get('csrftoken');
    const response = await fetch("/api/user/userbar/ingredients/delete", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': csrftoken
      },
      body: JSON.stringify({'ingredient': ing})
    })

    if (response.ok) {
        const { ingredientToRemove } = await response.json()
        dispatch(remove_ing(ingredientToRemove))
    }
}

export const reset = () => {
    return {
        type: RESET_USER_BAR_FAVORITES
    }
}

export const load_mybar = () => async dispatch => {
    const user = localStorage.getItem('token');
    if (user === null) {
        dispatch(reset())
        return
    }
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
    if (user === null) {
        dispatch(reset())
        return
    }
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
      case RESET_USER_BAR_FAVORITES:
          return {userBar:[], favorites:[]}
      case REMOVE_INGREDIENT_FROM_BAR:
          newState = {...state}
          newState.userBar = newState.userBar.filter(ingredient => ingredient !== action.ing)
          return newState
      case ADD_INGREDIENT_TO_MYBAR:
        if (action.ingredient === 'duplicate') {
            return state
        }
        newState = {...state}
        newState.userBar = [...newState.userBar, action.ingredient]
        return newState
      default:
        return state;
    }
  }
