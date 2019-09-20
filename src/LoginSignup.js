import React, { Component } from 'react';
import Login from './Login';
import SignUp from './Signup';
import './LoginSignupCSS.css';

class LoginSignup extends Component {
    state = {
        
    }

    render() { 
        
        return ( 
            <div >
                <div id="head">
                    <img src="../Melius_Logo2.png" id="logo" />
                    <h1>Melius</h1>
                </div>
                
                <div id="loginmain">
                    <div id="userlogin"><Login /></div>
                    <div class="line"></div>
                    <div id="usersignup"><SignUp /></div>
                </div>
            </div>

        );
    }
}

export default LoginSignup;