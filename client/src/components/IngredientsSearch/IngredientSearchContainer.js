import React from 'react'
import SearchBar from './IngredientSearchBar'
import IngredientSearchResults from './IngredientSearchResults'
import AddedIngredientList from './AddedIngredientList'

const IngredientSearchContainer = () => {

    return (
        <div className="Ingredient-Container">
            <IngredientSearchResults />
            <AddedIngredientList />
        </div>
    )
}

export default IngredientSearchContainer
