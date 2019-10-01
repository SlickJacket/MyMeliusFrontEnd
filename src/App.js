import React, { Component } from 'react';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';
import LoginSignup from './LoginSignup';
import CompanyProfile from './CompanyProfile';
import { Switch, Route, withRouter } from 'react-router-dom'
import UserProfile from './UserProfile';
// import UserPages from './UserPages';
// import { isError } from 'util';


class App extends Component {
  state = {
    email: '',
    name: '',
    title: '',
    user_id: '',
    company_id: '',
    user_rating: "",
    logo_url: "",
    average: ""
  }

  componentDidMount() {
    if (localStorage.token) {
      fetch('http://localhost:3000/profile',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(user => this.setState({email: user.email, name: user.name, title: user.title, user_id: user.id, company_id: user.company_id, user_rating: user.user_rating, logo_url: user.logo_url, averageRating: user.average} ))
    } else {
      this.props.history.push('/loginsignup')
    }
  }

getProfile = () => {
    fetch('http://localhost:3000/profile',{
        headers: {
        'Authorization': `Bearer ${localStorage.token}`
        }
    })
    .then(res => res.json())
    .then(user => {
      console.log(user)
        this.setState({email: user.email, user_id: user.id, name: user.name, title: user.title, company_id: user.company_id, logo_url: user.logo_url, user_rating: user.user_rating, averageRating: user.average})
    })
}

// getCompany = () => {
//   fetch(`http://localhost:3000/company/${this.state.company_id}`)
//   .then(response => response.json())
//   .then(data => console.log(data));
// }

  render() {
    // console.log(this.props)
    return (
      <Switch>
        <Route
          path={'/profile'}
    render={routerProps => <ProfilePage {...routerProps} email={this.state.email} name={this.state.name} title={this.state.title} user_id={this.state.user_id} company_id={this.state.company_id} user_photo={this.state.logo_url} user_rating={this.state.user_rating} getCompany={this.getCompany} averageRating={this.state.average}/>} />
          <Route
          path={'/loginsignup'}
          render={routerProps => <LoginSignup {...routerProps}  getProfile={this.getProfile} />} />
        <Route
          path={'/userprofile'}
          render={routerProps => <UserProfile {...routerProps} getProfile={this.getProfile} />} />
        <Route path={'/users'} component={UserProfile} />
        <Route path={'/companies/profile'} component={CompanyProfile} getCompany={this.state.getCompany}/>
        <Route path={'/'} component={HomePage} />
      </Switch>
    )
  }
}

export default withRouter(App);
