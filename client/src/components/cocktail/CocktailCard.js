import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

const CocktailCard = ({cocktailName, cocktailImage}) => {
    const history = useHistory()
    const favorited = useSelector(state => state.bar.favorites.map(fav => fav[0]))

    const handleClick = () =>{
        history.push(`/cocktails/${cocktailName}`)
    }

    return (
        <span className="CocktailCard" onClick={handleClick}>
            {(favorited.includes(cocktailName)) ? <FavoriteOutlinedIcon className="similar-cocktails__fav_icon" onClick={handleClick} /> : null}
            <img src={cocktailImage} alt="default" />
            <div className="cocktail-name">{cocktailName}</div>
        </span>
    )
}

export default CocktailCard
