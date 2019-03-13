import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Iframe from "react-iframe";
import IframeComm from "react-iframe-comm";
import '../../App.css';




class TicTacToe extends Component {
    state = {
        attributes: {
            src: "https://bryant-tic-tac-toe.herokuapp.com/",
            width: "100%",
            height: "175",
            frameBorder: 1, // show frame border just for fun...
        },
        postMessageData: {}

    }

    componentDidMount () {
        if (this.props.loggedUser.email) {
            this.setState({
                postMessageData: this.props.loggedUser
            });
            console.log(this.state.postMessageData, ' postMessageData from TicTacToe.js');
        } else {
            this.setState ({
                postMessageData: {}
            });
        }
    }

    onReceiveMessage = () => {
        console.log("onReceiveMessage");
    }

    onReady = () => {
        console.log("onReady");
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