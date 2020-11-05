import React from 'react'
import IngredientSearchContainer from './IngredientsSearch/IngredientSearchContainer'
import CocktailMatchSidebar from './cocktail/CocktailMatchSidebar'
const HomePage = () => {
    return(
        <div className="container">
            <IngredientSearchContainer/>
            <CocktailMatchSidebar />
        </div>
    )
}

export default HomePage
