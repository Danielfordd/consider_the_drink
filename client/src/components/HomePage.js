import React from 'react'
import IngredientSearchContainer from './IngredientsSearch/IngredientSearchContainer'
import CocktailMatchSidebar from './cocktail/CocktailMatchSidebar'
import { useSelector } from 'react-redux'
const HomePage = () => {
    const loggedIn = useSelector(state => !!state.authentication.user_id)
    return(
        <div className="container">
            <div className="homepage-welcome shadow">
                {loggedIn ? <div>Enter ingredients below to see cocktails that you can make with them.</div>
                : <pre>Enter ingredients below to see cocktails that you can make with them!! If you would like to save your bar's ingredients, <a href="/login">login</a> or <a href="/signup">sign up</a>.</pre>}
            </div>
            <div className="homepage-bottom">
                <IngredientSearchContainer/>
                <CocktailMatchSidebar />
            </div>
        </div>
    )
}

export default HomePage
