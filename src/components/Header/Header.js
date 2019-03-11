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
                    <li><img src="../../../public/github-brands.svg" alt="GitHub" title="GitHub"></img></li>
                </ul>
            </header>
        )
    }
}

export default withRouter(Header);