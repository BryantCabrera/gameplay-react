import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCashRegister, faSignInAlt, faSignOutAlt, faUser, faUsers, faGamepad } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

class NavBar extends Component {
    state = {
        open: false,
        buttonText: '+',
        overlayClass: '',
        wrapperClass: ''
    }

    openNav = () => {
        this.setState({
            open: true,
            buttonText: '-',
            overlayClass: ' on-overlay',
            wrapperClass: ' opened-nav'
        });
    }

    closeNav = () => {
        this.setState({
            open: false,
            buttonText: '+',
            overlayClass: '',
            wrapperClass: ''
        });
    }

    handleClick = (e) => {
        // if (!e) {
        //     let e = window.event;
        // }
        //prevents triggering click event on document
        e.stopPropagation();

        if (!this.state.open) {
            this.openNav();
        }
        else {
            this.closeNav();
        }
    }

    render() {
        return (
            <div className="nav" onClick={this.handleClick}>
                <button id="nav__button" className="nav__button" onClick={this.handleClick}>{this.state.buttonText}</button>
                <nav className={`nav__navbar${this.state.wrapperClass}`}>
                    <ul className="nav__navbar__links">
                        <li><NavLink exact to="/"><FontAwesomeIcon icon={faHome} /></NavLink></li>

                        <li><NavLink exact to="/users" onClick={this.props.getUsers}><FontAwesomeIcon icon={faUsers} /></NavLink></li>

                        <li><NavLink exact to="/games"><FontAwesomeIcon icon={faGamepad} /></NavLink></li>

                        {this.props.loggedUser._id ? <li><NavLink exact to={`/users/${this.props.loggedUser._id}`}><FontAwesomeIcon icon={faUser} />Me</NavLink></li> : <li><NavLink exact to="#" onClick={this.props.toggleRegister}><FontAwesomeIcon icon={faCashRegister} /></NavLink></li>}

                        {this.props.loggedUser._id ? <li><NavLink exact to="#" onClick={this.props.logoutUser}><FontAwesomeIcon icon={faSignOutAlt} /></NavLink></li> : <li><NavLink exact to="#" onClick={this.props.toggleLogin}><FontAwesomeIcon icon={faSignInAlt} /></NavLink></li>}
                    </ul>
                    <div id="nav__overlay" className={`nav__overlay${this.state.overlayClass}`}></div>
                </nav>
            </div>
        )
    }
}

export default withRouter(NavBar);