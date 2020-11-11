const LOAD_ALL_INGREDIENTS = 'ctd/ingredients/LOAD_ALL_INGREDIENTS'
const SET_INGREDIENT_RESULTS = 'ctd/ingredients/SET_INGREDIENT_RESULTS'
const Add_INGREDIENT_TO_FILTER = 'ctd/ingredients/Add_INGREDIENT_TO_FILTER'
const REMOVE_INGREDIENT_FROM_FILTER = 'ctd/ingredients/REMOVE_INGREDIENT_FROM_FILTER'
const CLEAR_ALL_ADDED_INGREDIENTS = 'ctd/ingredients/CLEAR_ALL_ADDED_INGREDIENTS'
const ADD_MYBAR_TO_ADDED_INGREDIENTS = 'ctd/ingredients/ADD_MYBAR_TO_ADDED_INGREDIENTS'
const REMOVE_MYBAR_TO_ADDED_INGREDIENTS = 'ctd/ingredients/REMOVE_MYBAR_TO_ADDED_INGREDIENTS'

const remove_myBar = (ingredients) => {
    return {
        type: REMOVE_MYBAR_TO_ADDED_INGREDIENTS,
        ingredients
    }
}

const add_myBar = (ingredients) => {
    return {
        type: ADD_MYBAR_TO_ADDED_INGREDIENTS,
        ingredients
    }
}

const loadIngredients = (ingredients) => {
    return {
        type:LOAD_ALL_INGREDIENTS,
        ingredients
    }
}

const setIngredientRes = (results) => {
    return {
        type:SET_INGREDIENT_RESULTS,
        results
    }
}

const addIngredientToFilt = (ingredient) => {
    return {
        type: Add_INGREDIENT_TO_FILTER,
        ingredient
    }
}

const clearAll = () => {
    return {
        type: CLEAR_ALL_ADDED_INGREDIENTS
    }
}

const remIngredientFromFilter = (ingredient) =>{
    return {
        type: REMOVE_INGREDIENT_FROM_FILTER,
        ingredient
    }
}

export const addMyBarToAdded = (ingredients) => async dispatch => {
    dispatch(add_myBar(ingredients))
}

export const removeMyBarToAdded = (ingredients) => async dispatch => {
    dispatch(remove_myBar(ingredients))
}

export const loadAllIngredients = () => async dispatch => {

    const response = await fetch('/api/ingredients/all')

    if (response.ok) {
        const ingredients = await response.json()
        dispatch(loadIngredients(ingredients.ingredients))
    }
}

export const setIngredientsResults = (results) => async dispatch => {
    dispatch(setIngredientRes(results))
}

export const addIngredientToFilter = (ingredient) => async dispatch => {
    dispatch(addIngredientToFilt(ingredient))
}

export const removeIngredientFromFilter = (ingredient) => async dispatch => {
    dispatch(remIngredientFromFilter(ingredient))
}

export const clearAllAddedIngredients = () => async dispatch => {
    dispatch(clearAll())
}

export default function reducer(state={ ingredients:[], results: [], filter:[] }, action) {
    let newState;
    switch (action.type) {
      case LOAD_ALL_INGREDIENTS:
        newState = { ...state }
        newState.ingredients = [...action.ingredients]
        newState.results = [...action.ingredients]
        return newState
      case SET_INGREDIENT_RESULTS:
          newState = {...state}
          newState.results = [...action.results]
          return newState
      case Add_INGREDIENT_TO_FILTER:
          newState = {...state}
          if (newState.filter.includes(action.ingredient)) {
              return newState
          }
          newState.filter = [...newState.filter, action.ingredient]
          return newState
      case REMOVE_INGREDIENT_FROM_FILTER:
          newState = {...state}
          newState.ingredients = [...newState.ingredients]
          newState.results = [...newState.results]
          newState.filter = [...newState.filter.filter(ing => ing !== action.ingredient)]
          return newState
      case CLEAR_ALL_ADDED_INGREDIENTS:
          newState = {...state}
          newState.filter = []
          return newState
      case ADD_MYBAR_TO_ADDED_INGREDIENTS:
          newState = {...state}
          const toAdd = action.ingredients.filter(ingredient => !newState.filter.includes(ingredient))
          newState.filter = [...newState.filter, ...toAdd]
          return newState
      default:
        return state;
    }
  }
