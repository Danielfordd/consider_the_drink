import React from 'react'
import {NavLink } from 'react-router-dom'

const AboutLinks = () => {

    return (
    <div className="footer">
        <div className="footer-inner">
            <span><NavLink to="" activeClassName="active" className="NavBar-link"><img src="/github-circle-icon_1.svg" /></NavLink></span>
            <span><NavLink to="/ingredients/search" activeClassName="active" className="NavBar-link">LinkedIn</NavLink></span>
            <span><NavLink to="/cocktails/all/1" activeClassName="active" className="NavBar-link">Angels List</NavLink></span>
            <span><NavLink to="/cocktails/all/1" activeClassName="active" className="NavBar-link">Portfolio</NavLink></span>
        </div>
    </div>
    )
}


export default AboutLinks
