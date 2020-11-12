import React, {useState} from 'react'
import { saveNote } from '../../store/cocktails'
import { useDispatch, useSelector } from 'react-redux'

const CocktailNoteWrite = ({cocktailId}) => {
    const [note, setNote] = useState("")
    const dispatch = useDispatch()
    const userId = useSelector(state => state.authentication.user_id)

    const writeNote = (e) => {
        e.preventDefault()
        dispatch(saveNote(note, cocktailId, userId))
        setNote("")
    }

    return(
        <form onSubmit={writeNote} className="cocktail-note__write">
            <textarea
            placeholder="test"
            value={note}
            onChange={e => setNote(e.target.value)}
            />
            <button>Add Note</button>
        </form>
    )
}

export default CocktailNoteWrite
