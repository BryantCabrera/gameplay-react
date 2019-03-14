import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Games from '../Games/Games';
import Coverflow from 'react-coverflow';
import '../../App.css';

class Main extends Component {
    render() {
        return (
            <main className="main">
                <img className="hero__img" src="https://i.imgur.com/s0gIVr3.jpg" alt="Header" title="Header"></img>
                {this.props.activityMessage ? 
                    <div>{this.props.activityMessage}</div>
                    : 
                    ''}
                <Coverflow width="960" height="500"
                    displayQuantityOfSide={2}
                    navigation={false}
                    enableScroll={true}
                    clickable={true}
                    active={0}
                >
                {this.props.games.map((game, index) => (
                    <div
                    onClick={() => this.props.history.push(`/games/${game._id}`)}
                    onKeyDown={() => console.log('clicking image')}
                    role="menuitem"
                    tabIndex="0"
                    >
                        <img
                            src={game.img}
                            alt={game.title}
                            title={game.title}
                            style={{
                            display: 'block',
                            width: '100%',
                            }}
                        />
                    </div>
                ))}
                </Coverflow>
            </main>
        )
    }
}

export default withRouter(Main);