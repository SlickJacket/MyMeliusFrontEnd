import React, { Component } from 'react';

class SignUp extends Component {
    // Signup
    render() {
    return (
        <div>
        <h2>Signup</h2>
        <form>
        <label className="field a-field a-field_a1">
                        <input className="field__input a-field__input" placeholder="e.g. John Doe" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Full Name</span>
                        </span>
                        </label>   

                        <label className="field a-field a-field_a1">
                        <input className="field__input a-field__input"  placeholder="e.g. myemail@gmail.com" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Email</span>
                        </span>
                        </label>

                        <label className="field a-field a-field_a1">
                        <input className="field__input a-field__input" type="password" placeholder="password" required />
                        <span className="a-field__label-wrap">
                        <span className="a-field__label">Password</span>
                        </span>
                        </label><br/>

                        <label className="field a-field a-field_a1">
                        <input className="field__input a-field__input" placeholder="e.g. Sales Manager" required />
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

export default SignUp;