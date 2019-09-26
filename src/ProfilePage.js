import React, { Component } from 'react';
import './ProfileCSS.css';
import { HamburgerArrow } from 'react-animated-burgers'
import ReactSearchBox from 'react-search-box'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class ProfilePage extends Component {
        state = {
        isActive: false,
        company: {},
        reviewees: {},
        reviewers: {},
        reviewing_users: [],
        reviewed_users: [],
        ratings: [],
        averageRating: ""
        }

        componentDidMount() {
            if (localStorage.token) {
                fetch('http://localhost:3000/profile',{
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
                })
                .then(res => res.json())
                .then(user => {
                    this.setState({company: user.company, reviewees: user.reviewees, reviewers: user.reviewers, reviewing_users: user.reviewing_users, reviewed_users: user.reviewed_users})
                    
                    let array = []

                    user.reviewing_users.map(function(review) {
                        array.push(review.rating)
                    })

                    this.setState({ratings: array})

                    fetch(`http://localhost:3000/users/${this.props.user_id}`, {
                    method: "PATCH",
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 
                            "user_rating": this.renderAverageRating()
                    })
                })
                })

                
            }
        }
            

        
    
        toggleButton = () => {
            this.setState({
            isActive: !this.state.isActive
        })
        }

        handleClick = () => {
            localStorage.clear()
            this.props.history.push('/loginsignup')
        } 

        renderReviews = () => {
            return this.state.reviewing_users.map(function(review) {
                
                return <li >{review.rating} {review.comment}</li>
            })
        }

        renderAverageRating = () => {
            let total = 0;

            for(var i = 0; i < this.state.ratings.length; i++) {
                total += this.state.ratings[i];
            }

            let avg = total / this.state.ratings.length;
            let flt = parseFloat(Math.round(avg * 100) / 100).toFixed(2);
            if (this.state.ratings.length === 0) {
            
            return "N/A";
        } else {
                let tostring = flt.toString()
            return tostring;
        }
    }
        

        
    render() { 
        // console.log(this.props);
        // let li =document.querySelectorAll('li')
        // console.log(li.innerText)
        // console.log(this.renderAverageRating())
        console.log(this.state.averageRating)

        return ( 

            
            <div>
                
                <div id="profileHeader">
                    <img src="../Melius_Logo2Black.png" id="logo" />
                    <h1 id="profileCompName">Melius</h1>

                    <button className="logout" onClick={this.handleClick}>Logout</button>

                    <div className="searchbar" >
                    <ReactSearchBox  placeholder=""value="Doe"data={this.data}callback={record => console.log(record)}/>
                    </div>


                    <HamburgerArrow id="hamburger" isActive={this.state.isActive} toggleButton={this.toggleButton}  />
                    
                </div>
                <div id="userMain">

                    <div>
                        <img src='./sarah-unsplash.png'  id="image" />
                    </div>


                        <div id="profileDetails">
                            <h2 id="username">{this.props.name}</h2>
                            <p style={{color: 'white'}}>{this.props.title}</p>
                            <p style={{color: 'white'}}><Link to={{
                        pathname: '/companies/profile',
                        state: { 
                            name: this.state.company.name,
                            address: this.state.company.address,
                            phone_number: this.state.company.phone_number,
                            company_id: this.state.company.id,
                            logo_url: this.state.company.logo_url

                        }
                    }}>{this.state.company.name}</Link> {this.props.user_rating}</p>
                            <p style={{color: 'white'}}>{this.state.company.address}</p>
                        </div>

                        

                </div>

                <div id="profileReviews">
                    <ul>{this.renderReviews()}</ul>
                </div>

                <div id="profileFooter">
                    
                </div>
                
            </div>
        );
    }
}

export default ProfilePage;