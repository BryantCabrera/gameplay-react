import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import Iframe from "react-iframe";
import IframeComm from "react-iframe-comm";
import '../../App.css';




class TicTacToe extends Component {
    state = {
        attributes: {
            src: "https://bryant-tic-tac-toe.herokuapp.com/",
            width: "100%",
            height: "795",
            frameBorder: 1, // show frame border just for fun...
        },
        postMessageData: {}
    }

    onReceiveMessage = async (message) => {
        console.log("onReceiveMessage");
        console.log(message.data, ' This is data from onReceiveMessage in TicTacToe.js');
        if (this.props.loggedUser._id) {
            await this.props.updateUser(message.data);
        } else {
            console.log('There was an error and your gameplay info could not be saved to the server.');
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
            // <Iframe 
            //     url="https://bryant-tic-tac-toe.herokuapp.com/"
            //     width="95%"
            //     height="80vw"
            //     id="myId"
            //     className="myClassname"
            //     display="initial"
            //     position="relative"
            //     allowFullScreen 
            // />
            <IframeComm
                attributes={this.state.attributes}
                postMessageData={this.state.postMessageData}
                handleReady={this.onReady}
                handleReceiveMessage={this.onReceiveMessage}
            />
        )
    }
}

export default withRouter(TicTacToe);