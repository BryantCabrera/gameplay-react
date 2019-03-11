import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import '../../App.css';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <ul className="footer__links">
                    <li><NavLink exact to="/">&copy; Bryant Cabrera</NavLink></li>
                </ul>
            </footer>
        )
    }
}

export default withRouter(Footer);