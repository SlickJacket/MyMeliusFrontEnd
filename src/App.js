import React, { Component } from 'react';
import ProfilePage from './ProfilePage';
// import HomePage from './HomePage';
import LoginSignup from './LoginSignup'
import { Switch, Route, withRouter } from 'react-router-dom'


class App extends Component {
  state = {
    email: '',
    name: '',
    title: ''
  }

  componentDidMount() {
    if (localStorage.token) {
      fetch('http://localhost:3000/profile',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(user => this.setState({email: user.email, name: user.name, title: user.title}))
    } else {
      this.props.history.push('/loginsignup')
    }
  }

  render() {
    console.log(this.props)
    return (
      <Switch>
        <Route
          path={'/profile'}
          render={routerProps => <ProfilePage {...routerProps} email={this.state.email} name={this.state.name} title={this.state.title} />} />
        <Route path={'/loginsignup'} component={LoginSignup} />
        {/* <Route path={'/'} component={HomePage} /> */}
      </Switch>
    )
  }
}

export default withRouter(App);
