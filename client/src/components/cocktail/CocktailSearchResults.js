import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { load_results_by_query } from '../../store/cocktails'
import { useDispatch, useSelector } from 'react-redux'
import CocktailCard from './CocktailCard'

const CocktailSearchResults = () => {
    const { query } = useParams()
    const dispatch = useDispatch()
    const cocktails = useSelector(state => state.cocktails.searchResults)

    useEffect(() => {
        dispatch(load_results_by_query(query))
    // eslint-disable-next-line
    }, [query])

    return (
        <div className="Cocktail-search-results-Container" >
        {cocktails.map( cocktail => <CocktailCard key={`resultcard-${cocktail.name}`} cocktailName={cocktail.name} cocktailImage={cocktail.image} />)}
        </div>
    )
}

export default CocktailSearchResults
