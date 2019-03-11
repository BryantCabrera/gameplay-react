import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Users from './components/Users/Users';
import UserProfile from './components/Users/UserProfile';
import Games from './components/Games/Games';
import Chat from './components/Chat/Chat';
import Footer from './components/Footer/Footer';

class App extends Component {
  state = {
    registerDisplay: 'none',
    loginDisplay: 'none',
    loggedUser: {},
    loginError: '',
    users: []
  }

  toggleRegister = () => {
    const display = this.state.registerDisplay === 'none' && this.state.loginDisplay === 'none' ? 'flex' : 'none';
    this.setState({
      registerDisplay: display
    });
  }

  toggleLogin = () => {
    const display = this.state.loginDisplay === 'none' && this.state.registerDisplay === 'none' ? 'flex' : 'none';
    this.setState({
      loginDisplay: display
    });
  }

  loginUser = (user) => {
    try {
      const loginResponse = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!loginResponse.ok) {
        throw Error(loginResponse.statusText)
      }

      const parsedResponse = await loginResponse.json();

      if (parsedResponse.data === 'login successful') {
        //Resets this component's state if a use was successfully logged in
        this.setState({
          loggedUser: user
        });

        this.props.history.push(`/users/${parsedResponse.createdUser._id}`);
      } else {
        this.setState({
          loginError: parsedResponse.data
        });
      }

    } catch (err) {
      console.log(err);
    }
  }

  getUsers = () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw Error()
      }

      const parsedResponse = await response.json();
      this.setState({
        users: parsedResponse.data
      });

    } catch (err) {
      console.log(err, ' This is error from AllProfiles.js');
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Register history={this.props.history} registerDisplay={this.state.registerDisplay} toggleRegister={this.toggleRegister} loginUser={this.loginUser} />
        <Login history={this.props.history} loginDisplay={this.state.loginDisplay} toggleLogin={this.toggleLogin} loginUser={this.loginUser} />
        <NavBar toggleRegister={this.toggleRegister} toggleLogin={this.toggleLogin} loggedUser={this.state.loggedUser} />
        <Switch>
          {/* <Route exact path="/register" component={() =>  <Register history={this.props.history} /> } /> */}
          {/* <Route exact path="/login" component={() =>  <Login history={this.props.history} toggleLogin={this.toggleLogin} loginDisplay={this.state.loginDisplay} /> } /> */}
          <Route exact path="/games" component={() => <Games history={this.props.history} />} />
          <Route exact path="/users" component={() => <Users history={this.props.history} getUsers={this.state.getUsers} users={this.state.users} /> } />
          <Route exact path="/users/id" component={() => <UserProfile history={this.props.history} />} />
        </Switch>
        <Chat />
        <Footer />
      </div>
    )
  }
}

export default withRouter(App);