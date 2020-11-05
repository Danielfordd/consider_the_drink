import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { load_results } from '../../store/cocktails'

const CocktailMatchSidebar = () => {
    const dispatch = useDispatch()
    const filteredIngredients = useSelector(state => state.ingredients.filter)
    const exact = useSelector(state => state.cocktails.matches.exact)
    const one_off = useSelector(state => state.cocktails.matches.one_off)
    const two_off = useSelector(state => state.cocktails.matches.two_off)

    useEffect(()=>{
        dispatch(load_results(filteredIngredients))

    }, [filteredIngredients])

    return (
    <div className="sidebar-container shadow">
        {exact.map(e => <div>test</div>)}
        {one_off.map(e => <div>one off</div>)}
        {two_off.map(e => <div>two off</div>)}
    </div>
    )
}

export default CocktailMatchSidebar
