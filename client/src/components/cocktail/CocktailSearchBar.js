import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const CocktailSearchBar = () => {
    const history = useHistory()
    const [cocktailQuery, setCocktailQuery] = useState("")

    const handleSearch = async (e) => {
        e.preventDefault()
        const response = await fetch(`/api/cocktails/search/${cocktailQuery}`)

        if (response.ok) {
            const results = await response.json()
            if (results.cocktails.length === 1) {
                history.push(`/cocktails/${results.cocktails[0].name}`)
            } else if (results.cocktails.length === 0) {
                history.push('/404')
            } else {
                history.push(`/cocktails/search/${cocktailQuery}`)
            }
        }
    }

    return (
        <form onSubmit={handleSearch} >
            <input
                onChange={e => setCocktailQuery(e.target.value)}
                value={cocktailQuery}
                className="SearchBar"
                type="text"
                placeholder="Search cocktails"
            />
      </form>
    )

}

export default CocktailSearchBar
