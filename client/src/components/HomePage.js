import React from 'react'
import IngredientSearchContainer from './IngredientsSearch/IngredientSearchContainer'
import CocktailMatchSidebar from './cocktail/CocktailMatchSidebar'
const HomePage = () => {
    return(
        <div className="container">
            <div className="homepage-welcome">
                <div>Welcome to Consider the Drink! Enter ingredients below to see cocktails that you can make with them. If you would like to save your bar's ingredients or favorite cocktails, <a href="/signup">sign up</a> or <a href="/login">login</a>.</div>
            </div>
            <div className="homepage-bottom">
                <IngredientSearchContainer/>
                <CocktailMatchSidebar />
            </div>
        </div>
    )
}

export default HomePage
