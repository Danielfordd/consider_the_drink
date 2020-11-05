const LOAD_ALL_INGREDIENTS = 'ctd/ingredients/LOAD_ALL_INGREDIENTS'
const SET_INGREDIENT_RESULTS = 'ctd/ingredients/SET_INGREDIENT_RESULTS'
const Add_INGREDIENT_TO_FILTER = 'ctd/ingredients/Add_INGREDIENT_TO_FILTER'
const REMOVE_INGREDIENT_FROM_FILTER = 'ctd/ingredients/REMOVE_INGREDIENT_FROM_FILTER'

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

const remIngredientFromFilter = (ingredient) =>{
    return {
        type: REMOVE_INGREDIENT_FROM_FILTER,
        ingredient
    }
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

export default function reducer(state={ ingredients:[], results: [], filter:[] }, action) {
    let newState;
    switch (action.type) {
      case LOAD_ALL_INGREDIENTS:
        newState = { ...state }
        newState.ingredients = [...action.ingredients]
        return newState
      case SET_INGREDIENT_RESULTS:
          newState = {...state}
          newState.results = [...action.results]
          return newState
      case Add_INGREDIENT_TO_FILTER:
          newState = {...state}
          newState.filter = [...newState.filter, action.ingredient]
          return newState
      case REMOVE_INGREDIENT_FROM_FILTER:
          newState = {...state}
          newState.ingredients = [...newState.ingredients]
          newState.results = [...newState.results]
          newState.filter = [...newState.filter.filter(ing => ing !== action.ingredient)]
          return newState
      default:
        return state;
    }
  }
