import Cookies from "js-cookie";

const LOAD_SINGLE_COCKTAIL = 'ctd/cocktails/LOAD_SINGLE_COCKTAIL'
const LOAD_ALL_COCKTAILS = 'ctd/cocktails/LOAD_ALL_COCKTAILS'
const SEARCH_COCKTAIL_BY_INGREDIENTS = 'ctd/cocktails/SEARCH_COCKTAIL_BY_INGREDIENTS'
const SEARCH_COCKTAIL_BY_QUERY = 'ctd/cocktails/SEARCH_COCKTAIL_BY_QUERY'
const CHANGE_SORT = 'ctd/cocktails/CHANGE_SORT'
const LOAD_COCKTAIL_TAGS = 'ctd/cocktails/LOAD_COCKTAIL_TAGS'
const UPDATE_TAG_CLICKED = 'ctd/cocktails/UPDATE_TAG_CLICKED'
const CLEAR_ALL_TAGS = 'ctd/cocktails/CLEAR_ALL_TAGS'
const CHECK_FAVORITED = 'ctd/cocktails/CHECK_FAVORITED'
const LOAD_ALL_NOTES = 'ctd/cocktails/LOAD_ALL_NOTES'
const DELETE_NOTE = 'ctd/cocktails/DELETE_NOTE'

const clear_tags = () => {
  return {
    type: CLEAR_ALL_TAGS
  }
}

const update_clicked = (tag) => {
  return {
    type:UPDATE_TAG_CLICKED,
    tag
  }
}

const load_tags = (tags) => {
  return {
    type: LOAD_COCKTAIL_TAGS,
    tags
  }
}

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

const load_name_res = (results) => {
  return {
    type: SEARCH_COCKTAIL_BY_QUERY,
    results
  }
}

const change_sort = (sort) => {
  return {
    type: CHANGE_SORT,
    sort
  }
}

const check_fav = (favorited) => {
  return {
    type: CHECK_FAVORITED,
    favorited
  }
}

const all_notes = (notes) => {
  return {
    type: LOAD_ALL_NOTES,
    notes
  }
}

const deleteNote = (noteId) => {
  return {
    type: DELETE_NOTE,
    noteId
  }
}

export const deleteCocktailNote = (noteId) => async dispatch => {
  const csrftoken = Cookies.get('csrftoken');
  const response = await fetch("/api/user/notes/delete", {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrftoken
    },
    body: JSON.stringify({'noteId': noteId})
  })

  if (response.ok) {
    const { deletedNoteId } = await response.json()
    dispatch(deleteNote(deletedNoteId))
  }
}

export const loadAllNotes = (userId, cocktailId) => async dispatch => {
  const response = await fetch(`/api/user/notes/all/${userId}/${cocktailId}`)

  if (response.ok) {
    const { notes } = await response.json()
    dispatch(all_notes(notes))
  }
}

export const saveNote = (note, cocktailId, userId) => async dispatch => {
  const csrftoken = Cookies.get('csrftoken');
  const response = await fetch("/api/user/notes/create", {
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrftoken
    },
    body: JSON.stringify({'note': note, 'cocktailId':cocktailId, 'userId': userId})
  })

  if (response.ok) {
    const { notes } = await response.json()
    dispatch(all_notes(notes))
  }
}

export const check_favorited = (cocktailId, userId) => async dispatch => {
  if (!cocktailId || !userId) {
    return
  }
  const response = await fetch (`/api/user/fav/${cocktailId}/${userId}`)

  if (response.ok) {
    const { favorited } = await response.json()
    dispatch(check_fav(favorited))
  }
}

export const favoriteCocktail = (cocktailId, userId) => async dispatch => {
  const csrftoken = Cookies.get('csrftoken');
  const response = await fetch(`/api/user/favorite/change`,{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrftoken
    },
    body: JSON.stringify({'id':userId, 'cocktail':cocktailId})
  })

  if (response.ok) {
    const { favorited } = await response.json()
    dispatch(check_fav(favorited))
  }
}

export const clearAllTags = () => async dispatch => {
  dispatch(clear_tags())
}

export const loadCocktailTags = () => async dispatch => {
  const response = await fetch('/api/cocktails/tags/all')

  if(response.ok) {
    let tags = await response.json()
    tags = tags.tags.map(tag => ({ name: tag, clicked:false}))
    dispatch(load_tags(tags))
  }
}

export const updateClicked = (tag) => async dispatch => {
  dispatch(update_clicked(tag))
}

export const change_sort_by = sort => async dispatch => {
  dispatch(change_sort(sort))
}

export const loadCocktailDetails = (cocktail_name) => async dispatch => {
    const response = await fetch(`/api/cocktails/${cocktail_name}`)
    if (response.ok) {
      const cocktail = await response.json();

      dispatch(loadCocktail(cocktail))
    }
}

export const loadAllCocktails = (page_num, quantity, sort, tags) => async dispatch => {
  let filteredTags = tags.filter(tag => tag.clicked).map(tag => tag.name + ",").join("")

  let response;

  if (filteredTags === "") {
    response = await fetch(`/api/cocktails/all/${page_num}/${quantity}/${sort}`)
  } else {
    response = await fetch(`/api/cocktails/all/${page_num}/${quantity}/${sort}/${filteredTags}`)
  }

  if (response.ok) {
    const cocktails = await response.json();
    dispatch (loadAll(cocktails.cocktails))
  }

}

export const load_results_by_ingredients = (ingredients) => async dispatch => {
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

export const load_results_by_query = query => async dispatch => {
  const response = await fetch(`/api/cocktails/search/${query}`)
  if (response.ok){
    const results = await response.json()
    dispatch(load_name_res(results.cocktails))
  }

}

const defaultState = {
                      cocktails:[],
                      matches: {
                          exact: [],
                          one_off: [],
                          two_off: []
                      },
                      searchResults: [],
                      current: {
                          name:"",
                          description:"",
                          instructions:[],
                          recipe:[],
                          glassware:[],
                          serving_styles:[],
                          similar: [],
                          notes: []
                        },
                      sort: "name_asc",
                      tags: [{name:"", clicked:false}],
                      favorited: false
                      }

export default function reducer(state=defaultState, action) {
    let newState;
    switch (action.type) {
      case LOAD_SINGLE_COCKTAIL:
        newState = {...state}
        newState.current = {...action.cocktail, notes: []}
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
                            serving_styles:[],
                            similar: [],
                            notes: []
                           }
        newState.cocktails = [...newState.cocktails]
        newState.matches = {exact: [...action.results.exact],
                            one_off: [...action.results.one_off],
                            two_off: [...action.results.two_off]
                           }
        return newState
      case SEARCH_COCKTAIL_BY_QUERY:
        newState = {...state}
        newState.searchResults = [...action.results]
        return newState
      case CHANGE_SORT:
        newState = { ...state }
        newState.sort = action.sort
        return newState
      case LOAD_COCKTAIL_TAGS:
        newState = {...state}
        newState.tags = action.tags
        return newState
      case UPDATE_TAG_CLICKED:
        newState = {...state}
        newState.tags = newState.tags.map(tag => {

          if (tag.name === action.tag) {
            tag.clicked = !tag.clicked
          }
          return {...tag}
        })
        return newState
      case CLEAR_ALL_TAGS:
        newState = {...state}
        newState.tags = newState.tags.map(tag => {
          tag.clicked = false
          return tag
        })
        return newState
      case CHECK_FAVORITED:
        newState = {...state}
        newState.favorited = action.favorited
        return newState
      case LOAD_ALL_NOTES:
        newState = {...state}
        newState.current.notes = action.notes
        return newState
      case DELETE_NOTE:
        newState = {...state}
        newState.current.notes = newState.current.notes.filter(note => note[1] !== action.noteId)
        return newState
      default:
        return state;
    }
  }
