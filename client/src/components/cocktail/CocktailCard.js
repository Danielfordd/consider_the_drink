import React from 'react'
import { useHistory } from 'react-router-dom'

const CocktailCard = ({cocktail}) => {
    const history = useHistory()

    const handleClick = () =>{
        history.push(`/cocktails/${cocktail}`)
    }

    return (
        <span className="CocktailCard" onClick={handleClick}><img src="/def.png" alt="default" /><div className="cocktail-name">{cocktail}</div></span>
    )
}

export default CocktailCard
