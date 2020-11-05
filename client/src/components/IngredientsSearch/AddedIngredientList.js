import React from 'react'
import { useSelector } from 'react-redux';
import XIcon from '../XIcon'

const AddedIngredientList = () => {
    const filteredIngredients = useSelector(state => state.ingredients.filter)

    return(

    <div className="Added-Ingredient_container">
        <h1>Added ingredients</h1>
        {filteredIngredients.map(ingredient => <div className="item-container"><span className="added-item-name" ><span key={`filtered-${ingredient}`}>{ingredient}</span></span><XIcon className="icon-t" ingredient={ingredient}/></div>)}
    </div>
    )
}

export default AddedIngredientList
