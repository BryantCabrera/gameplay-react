import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars, faStar, faUser, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

class UserCard extends Component {
    state = {
        cardClass: 'material-card Teal',
        iconClass: 'mc-btn-action',
        icon: faBars
    }

    toggleIconClass = () => {
        const newCardClass = this.state.cardClass === 'material-card Teal' ? 'material-card Teal mc-active' : 'material-card Teal';

        const newIconClass = this.state.iconClass === 'mc-btn-action' ? 'mc-btn-action fa-spin-fast' : 'mc-btn-action';

        const newIcon = this.state.icon === faBars ? faArrowLeft : faBars;

        this.setState({
            cardClass: newCardClass,
            iconClass: newIconClass,
            icon: newIcon
        });
    }

    render() {
        return (
            <article className={this.state.cardClass} key={this.props.user._id}>
                <h2>
                    <span>{this.props.user.username}</span>
                    <strong>
                        <FontAwesomeIcon icon={faStar} />
                        Valued Member
                    </strong>
                </h2>
                <div className="mc-content">
                    <div className="img-container">
                        <img className="mc__img" src={this.props.user.img} alt="User Profile" title="User Profile"></img>
                    </div>
                    <div className="mc-description">
                        <h3>Here are the games I've played</h3>
                        <table>
                            <thead><tr><th>Game</th><th>W</th><th>L</th><th>D</th></tr></thead>
                            <tbody>
                                {this.props.user.games ? this.props.user.games.map((game, index) => (
                                    <tr key={index}><td>{game.title}</td><td>{game.wins}</td><td>{game.losses}</td><td>{game.draws}</td></tr>
                                    )
                                )
                                : ''}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={this.state.iconClass} onClick={this.toggleIconClass}>
                    <FontAwesomeIcon icon={this.state.icon} />
                </div>
                <div className="mc-footer">
                    <h4>
                        Be Social
                    </h4>
                    <Link to={`/users/${this.props.user._id}`} ><FontAwesomeIcon icon={faUser} /></Link>
                    {this.props.loggedUser._id === this.props.user._id ? <Link to={`#`} onClick={() => this.props.deleteUser(this.props.user)}><FontAwesomeIcon icon={faUserMinus} /></Link> : ''}
                </div>
            </article>
        )
    }
}

export default withRouter(UserCard);