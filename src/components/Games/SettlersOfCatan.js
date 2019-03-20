import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import IframeComm from "react-iframe-comm";
import '../../App.css';

class SettlersOfCatan extends Component {
    state = {
        attributes: {
            src: "https://bryantcabrera.github.io/Settlers-of-Catan/",
            width: "100%",
            height: "795",
            frameBorder: 1, // shows frame border
        },
        postMessageData: {}
    }

    onReceiveMessage = async (message) => {
        if (message.data._id) {
            await this.props.updateUser(message.data);
        } 
    }

    onReady = () => {
        if (this.props.loggedUser.email) {
            this.setState({
                postMessageData: this.props.loggedUser
            });
        }
    }

    render() {
        return (
            <IframeComm
                attributes={this.state.attributes}
                postMessageData={this.state.postMessageData}
                handleReady={this.onReady}
                handleReceiveMessage={this.onReceiveMessage}
            />
        )
    }
}

export default withRouter(SettlersOfCatan);