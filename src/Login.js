import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: ''
}

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
}

    handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.token) {
            localStorage.token = data.token
            localStorage.email = data.user.email
            localStorage.id = data.user.id
            this.props.getProfile()
            this.props.history.push('/profile')
        }
    })
}

    render() {
        return (
            <div>
                <h2>Log in </h2>
                <form onSubmit={this.handleSubmit}>
                    <label className="field a-field a-field_a1">
                        <input onChange={this.handleChange} value={this.state.email} name="email" className="field__input a-field__input" placeholder="e.g. emailname@gmail.com" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Email</span>
                        </span>
                        </label>   

                        <label className="field a-field a-field_a1">
                        <input onChange={this.handleChange} value={this.state.password} name="password" className="field__input a-field__input" type="password" placeholder="password" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Password</span>
                        </span>
                        </label>     

                    <input className="loginbutton" type="submit" value="Log in"/>

                </form>
            </div>
        );
    }
}

export default withRouter(Login);;