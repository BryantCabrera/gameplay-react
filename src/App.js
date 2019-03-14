import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Users from './components/Users/Users';
import UserProfile from './components/Users/UserProfile';
import Games from './components/Games/Games';
import TicTacToe from "./components/Games/TicTacToe";
import Chat from './components/Chat/Chat';
import Footer from './components/Footer/Footer';

class App extends Component {
  state = {
    registerDisplay: "none",
    loginDisplay: "none",
    loggedUser: {},
    loginError: "",
    users: [],
    activityMessage: "",
    games: [
      {
        _id: "tictactoe",
        title: "Tic-Tac-Toe",
        author: "Bryant Cabrera",
        description: "Grab 3 consecutive rooms in the same row, column, or diagonal to win!",
        playTime: "2 min",
        img: "/tictactoe.png"
      },
      {
        _id: "connect4",
        title: "Connect 4",
        author: "Bryant Cabrera & Kevin Cuison",
        description: "Connect 4 of your pieces in a row, column, or diagonal to win!",
        playTime: "5 min",
        img: "/connect4-black.png"
      },
      {
        _id: "blackjack",
        title: "Black Jack",
        author: "Bryant Cabrera & Michael Siller",
        description: "Closest to 21 without going over wins! Aces are 1 or 11, faces are 10.",
        playTime: "2 min",
        img: "/blackjack.png"
      },
      {
        _id: "catan",
        title: "Settlers of Catan",
        author: "Bryant Cabrera",
        description: "Manage your resources and spread your settlements to be the 1st to get to 10 victory points!",
        playTime: "1 hr",
        img: "/catan.png"
      }
    ]
  };

  toggleRegister = () => {
    const display =
      this.state.registerDisplay === "none" &&
      this.state.loginDisplay === "none"
        ? "flex"
        : "none";
    this.setState({
      registerDisplay: display
    });
  };

  toggleLogin = () => {
    const display =
      this.state.loginDisplay === "none" &&
      this.state.registerDisplay === "none"
        ? "flex"
        : "none";
    this.setState({
      loginDisplay: display
    });
  };

  loginUser = async user => {
    try {
      const loginResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!loginResponse.ok) {
        throw Error(loginResponse.statusText);
      }

      const parsedResponse = await loginResponse.json();

      if (parsedResponse.data === "login successful") {
        //Resets this component's state if a use was successfully logged in
        this.setState({
          loggedUser: parsedResponse.user
          // selectedUser: parsedResponse.user
        });

        // this.props.history.push(`/users/${parsedResponse.user._id}`);
        this.props.history.push(`/games`);
      } else {
        this.setState({
          loginError: parsedResponse.data
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  logoutUser = async () => {
    try {
      const logoutResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!logoutResponse.ok) {
        throw Error(logoutResponse.error);
      }

      const parsedResponse = await logoutResponse.json();

      if (parsedResponse.data === "User successfully logged out.") {
        //Resets this component's state if a use was successfully logged in
        this.setState({
          loggedUser: {},
          // selectedUser: {},
          activityMessage: parsedResponse.data
        });

        this.props.history.push(`/`);
      } else {
        this.setState({
          loginError: parsedResponse.data
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  getUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw Error();
      }

      const parsedResponse = await response.json();
      this.setState({
        users: parsedResponse.data
      });
    } catch (err) {
      console.log(err, " This is error from getUsers in App.js");
    }
  };

  // selectUser = (user) => {
  //   this.props.setState({
  //     selectedUser: user
  //   });
  // }

  updateUser = async (user) => {
    if (this.state.loggedUser._id) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${this.state.loggedUser._id}`, {
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw Error()
        }
  
        const parsedResponse = await response.json();
        if (parsedResponse) {
          //this causes refreshes
          // this.setState({
          //   loggedUser: parsedResponse
          // });
          console.log(' User info was successfully updated.');
        }
  
      } catch (err) {
        console.log(err, ' This is error from updateUser in App.js');
      }
    }
  }

  deleteUser = async (user) => {
    if (this.state.loggedUser._id === user._id) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${user._id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw Error()
        }

        const parsedResponse = await response.json();
        if (parsedResponse.data === 'User successfully deleted.') {
          // Logs user out of the front end and updates the activityMessage displayed on DOM
          this.setState({
            loggedUser: {},
            activityMessage: parsedResponse.data
          });

          // Redirects to homepage
          this.props.history.push(`/`);
        }

      } catch (err) {
        console.log(err, ' This is error from deleteUser in App.js.');
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Chat />
        <Footer />
        <Register
          history={this.props.history}
          registerDisplay={this.state.registerDisplay}
          toggleRegister={this.toggleRegister}
          loginUser={this.loginUser}
        />
        <Login
          history={this.props.history}
          loginDisplay={this.state.loginDisplay}
          toggleLogin={this.toggleLogin}
          loginUser={this.loginUser}
        />
        <NavBar
          toggleRegister={this.toggleRegister}
          toggleLogin={this.toggleLogin}
          loggedUser={this.state.loggedUser}
          getUsers={this.getUsers}
          logoutUser={this.logoutUser}
        />
        <Switch>
          {/* <Route exact path="/register" component={() =>  <Register history={this.props.history} /> } /> */}
          {/* <Route exact path="/login" component={() =>  <Login history={this.props.history} toggleLogin={this.toggleLogin} loginDisplay={this.state.loginDisplay} /> } /> */}
          <Route
            exact
            path="/"
            component={() => (
              <Main history={this.props.history} games={this.state.games} activityMessage={this.state.activityMessage} />
            )}
          />
          <Route
            exact
            path="/games"
            component={() => (
              <Games
                history={this.props.history}
                games={this.state.games}
              />
            )}
          />
          <Route
            exact
            path="/games/tictactoe"
            component={() => (
              <TicTacToe
                history={this.props.history}
                games={this.state.games}
                loggedUser={this.state.loggedUser}
                updateUser={this.updateUser}
              />
            )}
          />
          <Route
            exact
            path="/users"
            component={() => (
              <Users
                history={this.props.history}
                users={this.state.users}
                loggedUser={this.state.loggedUser}
                deleteUser={this.deleteUser}
              />
            )}
          />
          <Route
            exact
            path="/users/:id"
            component={() => (
              <UserProfile
                history={this.props.history}
                loggedUser={this.state.loggedUser}
                deleteUser={this.deleteUser}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);