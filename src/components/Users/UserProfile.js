import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../App.css';

class UserProfile extends Component {
    state = {
        user: {}
    }

    componentDidMount = async () => {
        console.log(this.props.match.params.id);
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
            <h1>hello this is user page</h1>
                {this.state.user.username}
                {this.props.loggedUser._id === this.state.user._id ? 'You' : 'Not You'}
            </div>
        )
    }
}

export default withRouter(UserProfile);