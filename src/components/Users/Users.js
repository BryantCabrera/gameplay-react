import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserCard from './UserCard';
import '../../App.css';

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount () {
        this.props.getUsers();
    }

    render () {
        return (
            <ul className="users">
                {this.props.Users.map(user => {
                    return (
                        <li className="users__list-item" key={user.id}>
                            <UserCard user={user} />
                        </li>
                    )
                })}
            </ul>
        )
    }   
}


export default withRouter(Users);