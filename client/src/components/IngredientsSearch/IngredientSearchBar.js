import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { filterList } from '../../utils'
import { setIngredientsResults } from '../../store/ingredients'

const IngredientSearchBar = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredients.ingredients)
    const [query, setQuery] = useState("")

    const handleEnter = (e) => {
        e.preventDefault()
        return
    }
    const handleSearch = (e) => {
        setQuery(e.target.value)
    }

    useEffect(()=>{
        const results = filterList(query, ingredients)
        dispatch(setIngredientsResults(results))
        // eslint-disable-next-line
    }, [query])

    return (
        <form onSubmit={handleEnter} className="ingredient-search">
            <input
                onChange={handleSearch}
                value={query}
                className="SearchBar"
                type="text"
                placeholder="Search ingredients"
            />
      </form>
    )
}

export default IngredientSearchBar
