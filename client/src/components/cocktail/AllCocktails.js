import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { change_sort_by, loadAllCocktails, updateClicked } from '../../store/cocktails'
import CocktailCard from './CocktailCard'
import Pagination from '@material-ui/lab/Pagination';


const AllCocktails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const cocktails = useSelector(state => state.cocktails.cocktails)
    const sort = useSelector(state => state.cocktails.sort)
    const tags = useSelector(state => state.cocktails.tags)
    const { page } = useParams()

    useEffect(()=>{
        dispatch(loadAllCocktails(page, 20, sort, tags))
    // eslint-disable-next-line
    }, [page, sort, tags])

    const handleChange = (event, value) => {
        let page_num = Number(value)
        history.push(`/cocktails/all/${page_num}`)
      }

    const selectChange = (e) => {
        dispatch(change_sort_by(e.target.value))
    }

    const handleClick = (e) => {
        dispatch(updateClicked(e.target.innerHTML))
    }

    return (
        <div className="CocktailCard-Container">
            <div className="CocktailCard-Container__left" >
                <div className="all-cocktails__title">All Cocktails</div>
                <div className="all-cocktails__sort">
                    <span>Sort </span>
                    <select onChange={selectChange}>
                        <option value="name_asc">A-Z</option>
                        <option value="name_desc">Z-A</option>
                    </select>
                </div>
                {cocktails.map(cocktail => <CocktailCard key={`card-${cocktail}`}
                                                        cocktail={cocktail} />)}
                <div className="pagination-container">
                    <Pagination count={5} onChange={handleChange} />
                </div>
            </div>
            <div className="CocktailCard-Container__right shadow">
                <div className="CocktailCard-Container__right__inner">
                <h1>Tags</h1>
                {tags.map(tag => tag.clicked ?
                                  <div key={`tag-${tag.name}`} onClick={handleClick}  className="clicked" >{tag.name}</div>
                                : <div key={`tag-${tag.name}`} onClick={handleClick} >{tag.name}</div> )}
                </div>
            </div>
        </div>
    )
}

export default AllCocktails
