import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons';
// import logo from '../../static/imgs/logo.svg';
import '../../App.css';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <NavLink exact to="/" className="header__logo--link">
                    <img className="header__logo" src="https://i.imgur.com/Y40XSUQ.png" alt="Game Play Logo" title="Game Play Logo"></img></NavLink>
                <ul className="header__links">
                    <li className="header__links--item"><a href="https://github.com/BryantCabrera/gameplay-react" target="_blank" rel="noopener noreferrer"><img className="header__links--item--github" src="/imgs/github.svg" alt="GitHub" title="GitHub"></img></a></li>
                    <li className="header__links--item"><a href="https://www.linkedin.com/in/bryantcabrera/" target="_blank" rel="noopener noreferrer"><img className="header__links--item--linkedin" src="/imgs/linkedin.png" alt="LinkedIn" title="LinkedIn"></img></a></li>
                </ul>
            </header>
        )
    }
}

export default withRouter(Header);