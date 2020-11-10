import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllNotes } from '../../store/cocktails'

const CocktailNote = ({cocktailId}) => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.authentication.user_id)

    useEffect(()=>{
        dispatch(loadAllNotes(userId, cocktailId))
    },[cocktailId])

    return(
        <div>
            TEST
        </div>
    )
}

export default CocktailNote
