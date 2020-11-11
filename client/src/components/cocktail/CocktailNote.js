import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllNotes } from '../../store/cocktails'

const CocktailNote = ({cocktailId}) => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.authentication.user_id)
    const notes = useSelector(state => state.cocktails.current.notes)
    console.log(notes)
    useEffect(()=>{
        dispatch(loadAllNotes(userId, cocktailId))
    },[cocktailId])

    return(
        <>
            {notes.map(note => <div key={`note-${userId}-${note[1]}`} className="cocktail-note" >{note[0]}</div>)}
        </>
    )
}

export default CocktailNote
