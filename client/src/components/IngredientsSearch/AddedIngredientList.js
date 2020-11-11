import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import XIcon from '../XIcon'
import { clearAllAddedIngredients, addMyBarToAdded } from '../../store/ingredients'

const AddedIngredientList = () => {
    const dispatch = useDispatch()
    const filteredIngredients = useSelector(state => state.ingredients.filter)
    const myBar = useSelector(state => state.bar.userBar)
    const loggedIn = useSelector(state => !!state.authentication.user_id)
    // const loggedIn = true

    const clearAll = (e) => {
        dispatch(clearAllAddedIngredients())
    }

    const toggleMyBar = (e) => {
        dispatch(addMyBarToAdded(myBar))
    }

    return(

    <div className="Added-Ingredient_container shadow">
        <div className="Added-Ingredient_top">
            <span>Added ingredients</span>
            <span className="Added-Ingredient-top__clear" onClick={clearAll}>Clear All</span>
            {loggedIn ? <span className="Added-Ingredient-top__mybar" onClick={toggleMyBar}>Include My Bar Ingredients</span> : null}
        </div>
        {filteredIngredients.map(ingredient => <div className="item-container"><span className="added-item-name" ><span key={`filtered-${ingredient}`}>{ingredient}</span></span><XIcon className="icon-t" ingredient={ingredient}/></div>)}
    </div>
    )
}

export default AddedIngredientList
