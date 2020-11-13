import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const CocktailSearchBar = () => {
    const history = useHistory()
    const [cocktailQuery, setCocktailQuery] = useState("")

    const handleSearch = async (e) => {
        e.preventDefault()

        if(!cocktailQuery.replace(/\s/g, '').length) {
            history.push("/cocktails/all/1")
            setCocktailQuery("")
            return
        }

        const response = await fetch(`/api/cocktails/search/${cocktailQuery}`)

        if (response.ok) {
            const results = await response.json()
            if (results.cocktails.length === 1) {
                history.push(`/cocktails/${results.cocktails[0].name}`)
                setCocktailQuery("")
            } else if (results.cocktails.length === 0) {
                history.push('/404')
                setCocktailQuery("")
            } else {
                history.push(`/cocktails/search/${cocktailQuery}`)
                setCocktailQuery("")
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
