import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UserCard from './UserCard';
import '../../App.css';

class UserCard extends Component {

    return (
        <ul className="users">
            {data.getUsers.map(user => {
                return (
                    <li className="users__list-item" key={user.id}>
                        <UserCard user={user} />
                    </li>
                )
            })}
        </ul>
    )
}


export default withRouter(Users);