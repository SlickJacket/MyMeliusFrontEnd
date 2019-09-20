import React, { Component } from 'react';
import Login from './Login';
import SignUp from './SignUp';

class LoginSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <Login />
            <SignUp />
        );
    }
}

export default LoginSignup;