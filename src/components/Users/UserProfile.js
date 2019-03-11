import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UserProfile extends Component {
    render() {
        return (
            <div className="user-profile">
                This is Login.
            </div>
        )
    }
}

export default withRouter(UserProfile);