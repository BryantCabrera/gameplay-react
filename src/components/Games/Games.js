import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Games extends Component {
    render() {
        return (
            <div className="games">
                This is games list
            </div>
        )
    }
}

export default withRouter(Games);