import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { load_mybar, load_favorites } from '../store/bar'
import CocktailCard from './cocktail/CocktailCard'

const MyBar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user_id = useSelector(state => state.authentication.user_id)
    const userBar = useSelector(state => state.bar.userBar)
    const favCocktails = useSelector (state => state.bar.favorites)

    useEffect(()=> {
        dispatch(load_mybar(user_id))
        dispatch(load_favorites(user_id))
        // eslint-disable-next-line
    }, [user_id])

    if(!user_id) {
        history.push('/login')
    }

    return (
        <div>
            {userBar.map(baritem => <div key={`userbar-${baritem}`}>{baritem}</div>)}
            {favCocktails.map(cocktail => <CocktailCard cocktail={cocktail} />)}
        </div>
    )
}

export default MyBar
