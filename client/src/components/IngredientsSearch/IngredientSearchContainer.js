import React from 'react'
import SearchBar from './IngredientSearchBar'
import IngredientSearchResults from './IngredientSearchResults'
import AddedIngredientList from './AddedIngredientList'

const IngredientSearchContainer = () => {

    return (
        <div className="Ingredient-Container">
            <div>Welcome to Consider the Drink! Enter ingredients below to see cocktails that you can make with them. If you would like to save your bar's ingredients or favorite cocktails, <a href="/signup">sign up</a> or <a href="/login">login</a>.</div>
            <SearchBar />
            <IngredientSearchResults />
            <AddedIngredientList />
        </div>
    )
}

export default IngredientSearchContainer
