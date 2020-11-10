import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './authentication/LogoutButton'
import CocktailSearchBar from './cocktail/CocktailSearchBar'

const NavBar = () => {
    const loggedIn = useSelector(state => !!state.authentication.username)

    if(loggedIn) {
        return (
            <ul className="NavBar">
                       <li style={{float:'left'}}><NavLink exact to="/" className="NavBar-link logo"><img src="/logo.png" alt="logo" className="logo" /></NavLink></li>
            <li style={{float:'left'}} className="NavBar-search"><CocktailSearchBar /></li>
            <li><LogoutButton /></li>
            <li><NavLink to="/myBar" activeClassName="active" className="NavBar-link">My Bar</NavLink></li>
            <li><NavLink to="/cocktails/all/1" activeClassName="active" className="NavBar-link">Cocktails</NavLink></li>
        </ul>
        )
    } else {
        return (
            <ul className="NavBar">
                <li style={{float:'left'}}><NavLink exact to="/" className="NavBar-link logo"><img src="/logo.png" alt="logo" className="logo" /></NavLink></li>
                <li style={{float:'left'}} className="NavBar-search"><CocktailSearchBar /></li>
                <li><NavLink to="/signup" activeClassName="active" className="NavBar-link">Sign Up</NavLink></li>
                <li><NavLink to="/login" activeClassName="active" className="NavBar-link">Login</NavLink></li>
                <li><NavLink to="/cocktails/all/1" activeClassName="active" className="NavBar-link">Cocktails</NavLink></li>
            </ul>
        )
    }
}

export default NavBar
