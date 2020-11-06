const LOAD_SINGLE_COCKTAIL = 'ctd/cocktails/LOAD_SINGLE_COCKTAIL'
const LOAD_ALL_COCKTAILS = 'ctd/cocktails/LOAD_ALL_COCKTAILS'
const SEARCH_COCKTAIL_BY_INGREDIENTS = 'ctd/cocktails/SEARCH_COCKTAIL_BY_INGREDIENTS'

const loadCocktail = (cocktail) => {
  return {
    type: LOAD_SINGLE_COCKTAIL,
    cocktail
  }
}

const loadAll = (cocktails) => {
  return {
    type: LOAD_ALL_COCKTAILS,
    cocktails
  }
}

const load_res = (results) => {
  return {
    type: SEARCH_COCKTAIL_BY_INGREDIENTS,
    results
  }
}

export const loadCocktailDetails = (cocktail_name) => async dispatch => {
    const response = await fetch(`/api/cocktails/${cocktail_name}`)
    if (response.ok) {
      const cocktail = await response.json();

      dispatch(loadCocktail(cocktail))
    }
}

export const loadAllCocktails = (page_num) => async dispatch => {
  const response = await fetch(`/api/cocktails/all/${page_num}`)

  if (response.ok) {
    const cocktails = await response.json();
    dispatch (loadAll(cocktails.cocktails))
  }

}

export const load_results = (ingredients) => async dispatch => {
  let query = ""
  for (let i of ingredients.values()) {
    query += i += ","
  }
  if (!query) {
    let results = {
      exact: [],
      one_off: [],
      two_off: []
    }
    dispatch(load_res(results))
    return
  }
  const response = await fetch(`/api/cocktails/filter/${query}`)

  if (response.ok){
    const results = await response.json()
    dispatch(load_res(results))
  }

}

const defaultState = {
                      cocktails:[],
                      matches: {
                          exact: [],
                          one_off: [],
                          two_off: []
                      },
                      current: {
                          name:"",
                          description:"",
                          instructions:[],
                          recipe:[],
                          glassware:[],
                          serving_styles:[]
                        }
                      }

export default function reducer(state=defaultState, action) {
    let newState;
    switch (action.type) {
      case LOAD_SINGLE_COCKTAIL:
        newState = {...state}
        newState.current = action.cocktail
        return newState
      case LOAD_ALL_COCKTAILS:
        newState = { ...state }
        newState.cocktails = [...action.cocktails]
        return newState
      case SEARCH_COCKTAIL_BY_INGREDIENTS:
        newState = {...state}
        newState.current = {name:"",
                            description:"",
                            instructions:[],
                            recipe:[],
                            glassware:[],
                            serving_styles:[]
                           }
        newState.cocktails = [...newState.cocktails]
        newState.matches = {exact: [...action.results.exact],
                            one_off: [...action.results.one_off],
                            two_off: [...action.results.two_off]
                           }
        return newState
      default:
        return state;
    }
  }
