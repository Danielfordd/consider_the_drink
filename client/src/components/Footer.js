import React from 'react'
import { Icon } from '@iconify/react';
import linkedinIn from '@iconify-icons/cib/linkedin-in';
import githubIcon from '@iconify-icons/codicon/github'
import angellistIcon from '@iconify-icons/simple-icons/angellist';

const Footer = () => {
    return(
        <div className="footer">
            <span>Created by: Daniel Ford</span>
            <a href="https://github.com/Danielfordd/consider_the_drink" activeClassName="active" className="NavBar-link"><Icon icon={githubIcon} className="github" /></a>
            <a href="https://www.linkedin.com/in/daniel-ford-29970a5a/" className="NavBar-link"><Icon icon={linkedinIn} className="linkedin" /></a>
            <a href="https://angel.co/u/daniel-ford-14" className="NavBar-link"><Icon icon={angellistIcon} className="angels" /></a>
        </div>
    )
}

export default Footer
