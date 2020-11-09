import React from 'react'
import { useHistory } from 'react-router-dom'

const CocktailCard = ({cocktailName, cocktailImage}) => {
    const history = useHistory()

    const handleClick = () =>{
        history.push(`/cocktails/${cocktailName}`)
    }

    return (
        <span className="CocktailCard" onClick={handleClick}><img src={cocktailImage} alt="default" /><div className="cocktail-name">{cocktailName}</div></span>
    )
}

export default CocktailCard
