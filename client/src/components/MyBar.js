import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { load_mybar, load_favorites } from '../store/bar'
import CocktailCard from './cocktail/CocktailCard'
import XIcon from './XIcon'
import IngredientSearchBar from './IngredientsSearch/IngredientSearchBar'
import { addIngredientToMyBar } from './../store/bar'

const MyBar = () => {
    const dispatch = useDispatch()
    const user_id = useSelector(state => state.authentication.user_id)
    const userBar = useSelector(state => state.bar.userBar)
    const favCocktails = useSelector (state => state.bar.favorites)
    const results = useSelector(state => state.ingredients.results)

    const handleClick = (e) => {
        dispatch(addIngredientToMyBar(e.target.innerHTML))
    }

    useEffect(()=> {
        dispatch(load_mybar())
        dispatch(load_favorites())
        // eslint-disable-next-line
    }, [user_id])

    return (
        <div className="mybar-container">
            <div className="mybar-ingredients-container">
                <div className="mybar-ingredients__left shadow">
                    <h1>My Bar</h1>
                    {userBar.map(baritem => <div className="mybar-ingredients__left_ingredient">
                                                <span key={`userbar-${baritem}`}>{baritem}</span>
                                                <span><XIcon className="icon-t" myBar={true} ingredient={baritem} /></span>
                                            </div>)}
                </div>
                <div className="mybar-ingredients__right shadow">
                        <IngredientSearchBar />
                        {results.map(result => <span onClick={handleClick} key={`result-${result}`}>{result}</span>)}
                </div>
            </div>

            <div className="mybar-favorites">
                My favorites
                <div className="mybar-favorites__inside">
                    {favCocktails.map(cocktail => <CocktailCard cocktailName={cocktail[0]} cocktailImage={cocktail[1]} />)}
                </div>
            </div>
        </div>
    )
}

export default MyBar
