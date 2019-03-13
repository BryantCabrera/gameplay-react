import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserCard from './UserCard';
import '../../App.css';

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount () {
    }

    render () {
        return (
            <ul className="users">
                {this.props.users.map(user => {
                    return (
                        <li id={user._id} className="users__list-item" key={user._id}>
                            <UserCard user={user} />
                        </li>
                    )
                })}
            </ul>
        )
    }   
}


export default withRouter(Users);