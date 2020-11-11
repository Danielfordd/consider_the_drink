import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllNotes, deleteCocktailNote } from '../../store/cocktails'

const CocktailNote = ({cocktailId}) => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.authentication.user_id)
    const notes = useSelector(state => state.cocktails.current.notes)

    useEffect(()=>{
        dispatch(loadAllNotes(userId, cocktailId))
    },[cocktailId])

    const handleDelete = (e) => {
        const cocktailId = e.target.id.split("-")[1]
        dispatch(deleteCocktailNote(cocktailId))
    }
    return(
        <>
            {notes.map(note => <div key={`note-${userId}-${note[1]}`}>
                                    <div
                                         className="cocktail-note">
                                         {note[0]}
                                    </div>
                                    <div onClick={handleDelete} id={`note-${note[1]}`} >Delete</div>
                                </div>)}
        </>
    )
}

export default CocktailNote
