import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Iframe from "react-iframe";
import '../../App.css';

class TicTacToe extends Component {
    render() {
        return (
            <Iframe 
                url="https://bryant-tic-tac-toe.herokuapp.com/"
                width="450px"
                height="450px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
                allowFullScreen 
            />
        )
    }
}

export default withRouter(Games);