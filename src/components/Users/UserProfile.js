import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import EditProfile from './EditProfile';
import '../../App.css';

class UserProfile extends Component {
    state = {
        user: {},
        editDisplay: 'none'
    }

    componentDidMount = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${this.props.match.params.id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw Error()
            }

            const parsedResponse = await response.json();
            this.setState({
                user: parsedResponse.data
            });

        } catch (err) {
            console.log(err, ' This is error from UserProfile.js');
        }
    }

    toggleEdit = () => {
        console.log('hitting toggleEdit');
        const display = this.state.editDisplay === "none" ? "flex" : "none";
        this.setState({
          editDisplay: display
        });
        console.log(this.state.editDisplay);
    };
    
    render() {
        return (
            <div className="user-profile">
                <EditProfile editDisplay={this.state.editDisplay} toggleEdit={this.toggleEdit} updateUser={this.props.updateUser} user={this.props.loggedUser} />
                <h1>{this.state.user.username}'s Profile</h1>

                <div className="user-profile__card" id="bright">
                    <div className="info_section">
                        <div className="user-profile__header">
                        <img className="locandina" src={this.state.user.img} alt={this.state.user.name} title={this.state.user.name}/>
                        <h1>{this.state.user.name}</h1>
                        <h4>Let's Play</h4>
                        <span className="minutes"><FontAwesomeIcon icon={faStar} />
                        &nbsp; Valued Gamer</span>
                        <p className="type">10 plays until next rank</p>
                        </div>
                        <div className="user-profile__desc">
                        <div className="text">
                            I love playing videogames and boardgames!  This site is perfect for my needs.  Hit me up if you need 1 more player for your rooms! 
                            <ul className="user-profile__games">
                                {this.props.games.map((game, index) => (
                                    <li key={index} className="user-profile__game">
                                        <NavLink exact to={`/games/${game._id}`}><img src={game.img} alt={game.title} title={game.title}></img></NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        </div>
                        <div className="user-profile__social">
                        <ul>
                            <li>{this.props.loggedUser._id === this.state.user._id ? <div className="btn" onClick={() => this.toggleEdit()}>Edit Profile</div> : ''}</li>
                            <li>{this.props.loggedUser._id === this.state.user._id ? <div className="btn" onClick={() => this.props.deleteUser(this.state.user)}>Delete Profile</div> : ''}</li>
                        </ul>
                        </div>
                    </div>
                    <div className="blur_back bright_back"></div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserProfile);