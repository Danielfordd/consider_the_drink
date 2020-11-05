import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllCocktails } from '../../store/cocktails'
import CocktailCard from './CocktailCard'

const AllCocktails = () => {
    const dispatch = useDispatch()
    const cocktails = useSelector(state => state.cocktails.cocktails)

    useEffect(()=>{
        dispatch(loadAllCocktails())
    // eslint-disable-next-line
    }, [])

    return (
        <div className="CocktailCard-Container" >
        {cocktails.map( cocktail => <CocktailCard key={`card-${cocktail}`} cocktail={cocktail} />)}
        </div>
    )
}

export default AllCocktails
