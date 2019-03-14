import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

class UserProfile extends Component {
    state = {
        user: {}
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
    
    render() {
        return (
            <div className="user-profile">
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
                        <p className="text">
                            I love playing videogames and boardgames!  This site is perfect for my needs.  Hit me up if you need 1 more player for your rooms! 
                        </p>
                        </div>
                        <div className="user-profile__social">
                        <ul>
                            <li>{this.props.loggedUser._id === this.state.user._id ? <div className="btn" onClick={() => console.log('Editing...')}>Edit Profile</div> : ''}</li>
                            <li>{this.props.loggedUser._id === this.state.user._id ? <div className="btn" onClick={() => this.props.deleteUser(this.state.user)}>Delete Profile</div> : ''}</li>
                        </ul>
                        </div>
                    </div>
                    <div className="blur_back bright_back"></div>
                </div>

                {/* <div class="container">
                    <header>
                        <i class="fa fa-bars" aria-hidden="true"></i>
                    </header>
                    <main>
                        <div class="row">
                            <div class="left col-lg-4">
                                <div class="photo-left">
                                    <img class="photo" src="https://image.noelshack.com/fichiers/2017/38/2/1505775062-1505606859-portrait-1961529-960-720.jpg" />
                                    <div class="active"></div>
                                </div>
                                <h4 class="name">{this.state.user.username}</h4>
                                <p class="info">UI/UX Designer</p>
                                <p class="info">{this.state.user.email}</p>
                                <div class="stats row">
                                    <div class="stat col-xs-4" style="padding-right: 50px;">
                                    <div class="stat col-xs-4">
                                        <p class="number-stat">3,619</p>
                                        <p class="desc-stat">Followers</p>
                                    </div>
                                    <div class="stat col-xs-4">
                                        <p class="number-stat">42</p>
                                        <p class="desc-stat">Following</p>
                                    </div>
                                    <div class="stat col-xs-4" style="padding-left: 50px;">
                                    <div class="stat col-xs-4">
                                        <p class="number-stat">38</p>
                                        <p class="desc-stat">Uploads</p>
                                    </div>
                                </div>
                                <p class="desc">Hi ! My name is Jane Doe. I'm a UI/UX Designer from Paris, in France. I really enjoy photography and mountains.</p>
                                <div class="social">
                                    <i class="fa fa-facebook-square" aria-hidden="true"></i>
                                    <i class="fa fa-twitter-square" aria-hidden="true"></i>
                                    <i class="fa fa-pinterest-square" aria-hidden="true"></i>
                                    <i class="fa fa-tumblr-square" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="right col-lg-8">
                                <ul class="nav">
                                    <li>Gallery</li>
                                    <li>Collections</li>
                                    <li>Groups</li>
                                    <li>About</li>
                                </ul>
                                <span class="follow">Follow</span>
                                <div class="row gallery">
                                    <div class="col-md-4">
                                        <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774813-photo4.jpg" />
                                    </div>
                                    <div class="col-md-4">
                                        <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774814-photo5.jpg" />
                                    </div>
                                    <div class="col-md-4">
                                        <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774814-photo6.jpg" />
                                    </div>
                                    <div class="col-md-4">
                                        <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774817-photo1.jpg" />
                                    </div>
                                    <div class="col-md-4">
                                        <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774815-photo2.jpg" />
                                    </div>
                                    <div class="col-md-4">
                                        <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774816-photo3.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div> */}
            </div>
        )
    }
}

export default withRouter(UserProfile);