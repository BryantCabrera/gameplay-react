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

    componentDidMount () {
        // console.log(this.props, ' loggedUser from TicTacToe.js props.');
        // if (this.props.loggedUser.email) console.log(this.props.loggedUser, ' loggedUser from TicTacToe.js props.');
        // if (this.props.loggedUser.email) {
        //     this.setState({
        //         postMessageData: this.props.loggedUser
        //     });
        //     console.log(this.state.postMessageData, ' postMessageData from TicTacToe.js');
        // } else {
        //     this.setState ({
        //         postMessageData: {}
        //     });
        //     console.log(this.state.postMessageData, ' postMessageData from TicTacToe.js');
        // }
    }

    onReceiveMessage = (message) => {
        console.log("onReceiveMessage");
        console.log(message.data, ' This is data from onReceiveMessage in TicTacToe.js');
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