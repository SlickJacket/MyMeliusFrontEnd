import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SignUp extends Component {
    state = {
        name: "",
        password: "",
        email: "",
        title: "",
        company_id: 1
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
    .then(data => {
        if (data.token) {
        localStorage.token = data.token
            // console.log(this.props.history)
        this.props.history.push('/profile')
        }
    })
}

    render() {
    return (
        <div>
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
            <label className="field a-field a-field_a1">
                        <input onChange={this.handleChange} value={this.state.name} className="field__input a-field__input" name="name" placeholder="e.g. John Doe" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Full Name</span>
                        </span>
                        </label>   

            <label  className="field a-field a-field_a1">
                        <input onChange={this.handleChange} value={this.state.email} name="email" className="field__input a-field__input"  placeholder="e.g. myemail@gmail.com" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Email</span>
                        </span>
                        </label>

            <label className="field a-field a-field_a1">
                        <input onChange={this.handleChange} value={this.state.password} name="password"className="field__input a-field__input" type="password" placeholder="password" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Password</span>
                        </span>
                        </label><br/>

            <label className="field a-field a-field_a1">
                        <input onChange={this.handleChange} value={this.state.title}name="title" className="field__input a-field__input" placeholder="e.g. Sales Manager" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Title</span>
                        </span>
                        </label><br/>

            <input className="signupbutton" type="submit" value="Signup"/>
        </form>
        </div>
        );
    }
}

export default withRouter(SignUp);