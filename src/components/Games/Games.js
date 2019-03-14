import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import '../../App.css';

class Games extends Component {
    render() {
        return (
            <div className="games">
                {this.props.games.map((game, index) => (
                            // <div className="slide-container">
                                <div className="wrapper" key={index}>
                                    <div className={`game-card ${game._id}`}>
                                        <div className={`game-card__image game-card__image--${game._id}`}>
                                            <img src={game.img} alt={game.title} title={game.title} />
                                        </div>
                                        <div className={`game-card__level game-card__level--${game._id}`}>{game.author}</div>
                                        <div className="game-card__unit-name">{game.title}</div>
                                        <div className="game-card__unit-description">
                                            {game.description}
                                        </div>

                                        <div className={`game-card__unit-stats game-card__unit-stats--${game._id} clearfix`}>
                                            <div className="one-third">
                                            <div className="stat">{game.playTime}</div>
                                            <div className="stat-value">Time</div>
                                            </div>

                                            <div className="one-third">
                                            <div className="stat">
                                                <NavLink exact to={`/games/${game._id}`} onClick={this.props.toggleRegister}>
                                                    <FontAwesomeIcon className="stat__icon" icon={faPlay} />
                                                </NavLink>
                                            </div>
                                            <div className="stat-value">Play</div>
                                            </div>

                                            <div className="one-third no-border">
                                            <div className="stat">150</div>
                                            <div className="stat-value">Plays</div>
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
                            // </div> 
                        )
                    )
                }
            </div>
        )
    }
}

export default withRouter(Games);