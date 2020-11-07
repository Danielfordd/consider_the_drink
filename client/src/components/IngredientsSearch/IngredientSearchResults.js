import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addIngredientToFilter } from '../../store/ingredients'
import IngredientSearchBar from './IngredientSearchBar'
const IngredientSearchResultsContainer = () => {
    const dispatch = useDispatch();
    const results = useSelector(state => state.ingredients.results)

    const handleClick = (e) => {
        dispatch(addIngredientToFilter(e.target.innerHTML))
    }

    return(
        <div className="Ingredient-Search-Container shadow">
        <IngredientSearchBar />
        {results.map(result => <span onClick={handleClick} key={`result-${result}`} className="test">{result}</span>)}
        </div>
    )
}

export default IngredientSearchResultsContainer
