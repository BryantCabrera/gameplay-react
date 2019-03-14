import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Games from '../Games/Games';
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
                <Games games={this.props.games}/>
            </main>
        )
    }
}

export default withRouter(Main);