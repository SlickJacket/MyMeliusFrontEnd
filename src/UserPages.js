import React, { Component } from 'react';
import UserProfile from './UserProfile';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class UserPages extends Component {
        state = {
                users: []
        }

        componentDidMount() {
            fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(users => this.setState({users: users}))

            }

            renderPages = () => {
                // console.log(this.state.users)
            return  this.state.users.map(function(user) {
                    console.log(user.name)
                    return <li style={{color: 'white'}}><Link to={{
                        pathname: '/users',
                        state: { 
                            name: user.name,
                            email: user.email,
                            title: user.title,
                            company_id: user.company_id,
                            user_id: user.id

                        }
                    }}>{user.name}</Link></li>
                    // user.map(function(thisUser) {
                    //     return <li style={{color: 'white'}}>{thisUser.name}</li>
                    // })
                })
            }
    

    render() { 
        // console.log(this.state.users)
        return ( 
            <ul>{this.renderPages()}</ul>
        );
    }
}

export default UserPages;