import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { favoriteCocktail, check_favorited } from '../../store/cocktails'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

const FavoriteButton = ({cocktailId, userId}) => {
    const dispatch = useDispatch()
    const favorited = useSelector(state => state.cocktails.favorited)

    useEffect(()=>{
        dispatch(check_favorited(cocktailId, userId))
        // eslint-disable-next-line
    }, [cocktailId])

    const handleClick = () =>{
        dispatch(favoriteCocktail(cocktailId, userId))
    }

    return(
        <>
        {favorited ? <FavoriteOutlinedIcon style={{color:'red', float:'right', margin: '10px'}} onClick={handleClick} />
                   : <FavoriteBorderOutlinedIcon style={{color:'red', float:'right', margin: '10px'}} onClick={handleClick} />}
        </>
    )
}

export default FavoriteButton
