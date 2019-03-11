import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../App.css';

class UserProfile extends Component {
    
    render() {
        console.log(this.props.selectedUser, " this is selected user");
        return (
            <div className="user-profile">
                {this.props.selectedUser.name}
            </div>
        )
    }
}

export default withRouter(UserProfile);