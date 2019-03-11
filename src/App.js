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
    loggedUser: {}
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
    this.setState({
      loggedUser: user
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Register history={this.props.history} registerDisplay={this.state.registerDisplay} toggleRegister={this.toggleRegister} />
        <Login history={this.props.history} loginDisplay={this.state.loginDisplay} toggleLogin={this.toggleLogin} loginUser={this.loginUser} />
        <NavBar toggleRegister={this.toggleRegister} toggleLogin={this.toggleLogin} />
        <Switch>
          {/* <Route exact path="/register" component={() =>  <Register history={this.props.history} /> } /> */}
          {/* <Route exact path="/login" component={() =>  <Login history={this.props.history} toggleLogin={this.toggleLogin} loginDisplay={this.state.loginDisplay} /> } /> */}
          <Route exact path="/games" component={() => <Games history={this.props.history} />} />
          <Route exact path="/users" component={() => <Users history={this.props.history} />} />
          <Route exact path="/users/id" component={() => <UserProfile history={this.props.history} />} />
        </Switch>
        <Chat />
        <Footer />
      </div>
    )
  }
}

export default withRouter(App);