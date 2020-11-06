import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllCocktails } from '../../store/cocktails'
import CocktailCard from './CocktailCard'
import Pagination from '@material-ui/lab/Pagination';


const AllCocktails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const cocktails = useSelector(state => state.cocktails.cocktails)
    const { page } = useParams()
    console.log(page)
    useEffect(()=>{
        dispatch(loadAllCocktails(page))
    // eslint-disable-next-line
    }, [page])

    const handleChange = (event, value) => {
        let page_num = Number(value)
        history.push(`/cocktails/all/${page_num}`)
      }

    return (
        <div className="CocktailCard-Container" >
        {cocktails.map( cocktail => <CocktailCard key={`card-${cocktail}`} cocktail={cocktail} />)}
        <Pagination count={5} onChange={handleChange} />
        </div>
    )
}

export default AllCocktails
