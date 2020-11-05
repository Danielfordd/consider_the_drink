import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadCocktailDetails } from '../../store/cocktails'

const CocktailDetailPage = () =>{
    const { cocktail } = useParams()
    const dispatch = useDispatch()
    const cocktailInfo = useSelector(state => state.cocktails.current)

    useEffect(()=>{
        dispatch(loadCocktailDetails(cocktail))
    // eslint-disable-next-line
    },[cocktail])

    return (
        <div className="details-container">
            <div className="details-top">
                <img src="/def.png" alt="default" />
                <div>
                    <h1>{cocktailInfo.name}</h1>
                    <p>{cocktailInfo.description}</p>
                </div>
            </div>
            <div className="details-bottom">
                <div className="details-recipe">
                    <div>
                        <ul>{cocktailInfo.recipe.map(rec => (
                            <li>{rec.ingredient}: {rec.ingredient_quantity}</li>))}
                        </ul>
                        <div>Glassware: {cocktailInfo.glassware.map(glass=><span>{glass}</span>)}</div>
                        <div>Serving Styles: {cocktailInfo.serving_styles.map(style=><span>{style} </span>)}</div>
                    </div>
                </div>
                <div className="details-instruction">
                    <ul>{cocktailInfo.instructions.map(instruction => (
                        <li>{instruction.order+1}{instruction.instruction}</li>))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CocktailDetailPage