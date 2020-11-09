import React from 'react'
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
