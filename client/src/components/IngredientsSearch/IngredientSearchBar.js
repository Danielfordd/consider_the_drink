import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { filterList } from '../../utils'
import { setIngredientsResults } from '../../store/ingredients'

const IngredientSearchBar = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredients.ingredients)
    const [query, setQuery] = useState("")

    const handleSearch = (e) => {
        setQuery(e.target.value)
        const results = filterList(query, ingredients)
        dispatch(setIngredientsResults(results))
    }

    return (
        <form onSubmit={handleSearch} >
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
