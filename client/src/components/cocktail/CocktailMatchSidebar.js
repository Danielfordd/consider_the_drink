import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { load_results_by_ingredients } from '../../store/cocktails'

const CocktailMatchSidebar = () => {
    const dispatch = useDispatch()
    const filteredIngredients = useSelector(state => state.ingredients.filter)
    const exact = useSelector(state => state.cocktails.matches.exact)
    const one_off = useSelector(state => state.cocktails.matches.one_off)
    const two_off = useSelector(state => state.cocktails.matches.two_off)
    const history = useHistory()

    useEffect(()=>{
        dispatch(load_results_by_ingredients(filteredIngredients))
    // eslint-disable-next-line
    }, [filteredIngredients])

    const handleClick = (e) => {
        const cocktail = e.target.innerHTML.trim()
        history.push(`/cocktails/${cocktail}`)
    }

    return (
    <div className="sidebar-container shadow">
        <h1>Cocktails Recommendations</h1>
        {(!exact.length && !one_off.length && !two_off.length) ? <div className="no-matches">Add more ingredients for reccomendations.</div> : null}
        {exact.length > 0 ? <div className="match-title">Make now</div> : <div></div>}
        {exact.map(e => <div onClick={handleClick} className="match-result">{e}</div>)}
        {one_off.length > 0 ? <div className="match-title">Just one more ingredient</div> : <div></div>}
        {one_off.map(e => <div onClick={handleClick} className="match-result">{e}</div>)}
        {two_off.length > 0 ? <div className="match-title" >Two more ingredients</div> : <div></div>}
        {two_off.map(e => <div onClick={handleClick} className="match-result">{e}</div>)}
    </div>
    )
}

export default CocktailMatchSidebar
