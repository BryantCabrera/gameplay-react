import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../App.css';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        verify_password: '',
        img: 'https://i.imgur.com/KbicDVh.jpg',
        games: [{
            title: '',
            author: '',
            wins: 0,
            losses: 0,
            draws: 0
        }],
        error: ''
    }

    // componentDidMount = () => {
    //     console.log(this.props, ' Register props');
    // }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

        if (e.target.name === 'password' || e.target.name === 'verify_password') {
            this.setState({
                error: ''
            });
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password, verify_password, img } = this.state;

        const newUser = {
            username: username,
            email: email,
            password: password,
            img: img
        }

        if (password === verify_password) {
            try {
                const loginResponse = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(newUser),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!loginResponse.ok) {
                    throw Error(loginResponse.statusText)
                }

                const parsedResponse = await loginResponse.json();

                if (parsedResponse.data === 'Registration successful.') {
                    //Resets this component's state if a use was successfully logged in
                    this.setState({
                        username: '',
                        email: '',
                        password: '',
                        verify_password: '',
                        img: 'https://i.imgur.com/KbicDVh.jpg',
                        games: [{
                            title: '',
                            author: '',
                            wins: 0,
                            losses: 0,
                            draws: 0
                        }],
                        error: ''
                    })
                    this.props.loginUser(parsedResponse.createdUser);
                    this.props.toggleRegister();
                    this.props.history.push(`/users/${parsedResponse.createdUser._id}`);
                }

            } catch (err) {
                console.log(err);
            }
        } else {
            // If the password verification does not match, reset password and verify_password input fields and display error message.
            this.setState({
                password: '',
                verify_password: '',
                error: 'Your passwords don\'t match.'
            });
        }
    }

    render() {
        return (
            <div className="overlay" style={{ display: `${this.props.registerDisplay}` }}>
                <form className="register" onSubmit={this.handleSubmit}>
                    <button className="close-modal" type="button" onClick={this.props.toggleRegister}>X</button>
                    {this.state.error ? <div className="error-message">{this.state.error}</div> : ''}
                    <div className="form__field">
                        <input
                            className="form__field--input"
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        >
                        </input>
                        <label className="form__field--label" htmlFor="username">
                            Username
                        </label>
                    </div>
                    <div className="form__field">
                        <input
                            className="form__field--input"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        >
                        </input>
                        <label className="form__field--label" htmlFor="email">
                            Email
                        </label>
                    </div>
                    <div className="form__field">
                        <input
                            className="form__field--input"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        >
                        </input>
                        <label className="form__field--label" htmlFor="password">
                            Password
                        </label>
                    </div>
                    <div className="form__field">
                        <input
                            className="form__field--input"
                            name="verify_password"
                            type="password"
                            placeholder="Verify password"
                            value={this.state.verify_password}
                            onChange={this.handleChange}
                        >
                        </input>
                        <label className="form__field--label" htmlFor="verify_password">
                            Verify password
                        </label>
                    </div>
                    <button className="btn form__btn">Register</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Register);