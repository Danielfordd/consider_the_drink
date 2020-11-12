import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadCocktailDetails } from '../../store/cocktails'
import CocktailCard from './CocktailCard'
import FavoriteButton from './FavoriteButton'
import CocktailNote from './CocktailNote'
import CocktailNoteWrite from './CocktailNoteWrite'
import CircularProgress from '@material-ui/core/CircularProgress';

const CocktailDetailPage = () =>{
    const { cocktail } = useParams()
    const dispatch = useDispatch()
    const cocktailInfo = useSelector(state => state.cocktails.current)
    const userId = useSelector(state => state.authentication.user_id)

    useEffect(()=>{
        dispatch(loadCocktailDetails(cocktail))
        // eslint-disable-next-line
    },[cocktail])
    if (cocktailInfo.name === "") {
        return (
            <div className="loading">
                <CircularProgress size={200} color={'primary'}/>
            </div>
        )
    } else {
        return (
        <div className="details-outside-container">
            <div className="details-container">
                <div>
                    <div className="details-top">
                        <img src={cocktailInfo.image} alt={cocktailInfo.image} />
                        <div>
                            <h1>{cocktailInfo.name}</h1>
                            <p>{cocktailInfo.description}</p>
                        </div>
                    </div>
                    <div className="details-bottom">
                        <div className="details-recipe">
                            <div>
                                <div className="details-recipe__top">
                                    {cocktailInfo.recipe.map(rec => (
                                        <><div key={`recipe-${rec.ingredient}`}>{rec.ingredient}</div> <div>{rec.ingredient_quantity}</div></>))}
                                </div>
                                <div className="details-recipe__bottom">
                                    <div>Garnish: {cocktailInfo.garnish.map(garn => <span key={garn}>{garn}</span>)} </div>
                                    <div>Glassware: {cocktailInfo.glassware.map(glass=><span key={`glass-${glass}`}>{glass}</span>)}</div>
                                    <div>Serving Styles: {cocktailInfo.serving_styles.map(style=><span key={style}>{style} </span>)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="details-instruction">
                            <div>{cocktailInfo.instructions.map(instruction => (
                                <div className="details-instruction__each" key={`instruction-${instruction.order}`}>{instruction.order+1}. {instruction.instruction}</div>))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="cocktail-details-side shadow"> */}
                    {userId ? <div className="cocktail-details-side shadow">
                    <span>My Notes<FavoriteButton cocktailId={cocktailInfo.id} userId={userId}/></span>
                    <div>
                        <CocktailNote cocktailId={cocktailInfo.id} userId={userId}/>
                    </div>
                    <div>
                        <CocktailNoteWrite cocktailId={cocktailInfo.id}/>
                    </div>
                    </div>:
                    <div className="cocktail-details-side loggedOut shadow">
                        <div className="cocktail-detail-loggedOut"><a href="/login">Login</a> or <a href="/signup">signup</a> to favorite cocktails and write yourself notes.</div>
                    </div>}
                {/* </div> */}
            </div>

            <div className="details-similar">
                <h1>Similar Cocktails</h1>
                <div className="detail-similar-cards">
                    {cocktailInfo.similar.map(cocktail => <CocktailCard key={`similar-${cocktail.cocktail}`} cocktailName={cocktail.cocktail} cocktailImage={cocktail.image} />)}
                </div>
            </div>
        </div>
    )
}
}

export default CocktailDetailPage
