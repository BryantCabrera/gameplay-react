import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import IframeComm from "react-iframe-comm";
import '../../App.css';

class BlackJack extends Component {
    state = {
        attributes: {
            src: "https://msiller455.github.io/blackjack/",
            width: "100%",
            height: "795",
            frameBorder: 1, // show frame border just for fun...
        },
        postMessageData: {}
    }

    onReceiveMessage = async (message) => {
        // console.log("onReceiveMessage");
        // console.log(message.data, ' This is data from onReceiveMessage in TicTacToe.js');
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

export default withRouter(BlackJack);