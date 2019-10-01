import React, { Component } from 'react';
import './ProfileCSS.css';
import { HamburgerArrow } from 'react-animated-burgers';
import ReactSearchBox from 'react-search-box';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';
import 'react-rater/lib/react-rater.css'



class UserProfile extends Component {
        state = {
        isActive: false,
        company: {},
        reviewees: [],
        reviewers: [],
        reviewing_users: [],
        reviewed_users: [],
        comment: "",
        rating: "",
        ratings: [],
        averageRating: "",
        myRating: "",
        myReviewers: []
        }

        componentDidMount() {
            window.scrollTo(0, 0)
            if (localStorage.id == this.props.location.state.user_id) {
                this.props.history.push('/profile')
            } else {
                fetch(`http://localhost:3000/users/${this.props.location.state.user_id}`)
                .then(res => res.json())
                .then(user => { this.setState({company: user.company, reviewees: user.reviewees, reviewers: user.reviewers, reviewing_users: user.reviewing_users, reviewed_users: user.reviewed_users})
                
                fetch(`http://localhost:3000/useraverage/${user.id}`)
                .then(res => res.json())
                .then(data => this.setState({myRating: data}))

                fetch(`http://localhost:3000/datetime/${user.id}`)
                .then(res => res.json())
                .then(data => this.setState({myReviewers: data}))
            })
        }

        // let proxy = "https://cors-anywhere.herokuapp.com"
        // let url = "https://27nw6pkrj3.execute-api.us-east-1.amazonaws.com/default/getEvent/00001"

        // fetch(proxy + url)
        //     .then(res => res.json())
        //     .then(data => console.log(data[0].eventName))

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

        handleChange = (e) => {
            this.setState({[e.target.name]: e.target.value})
        }

        onStarClick(nextValue, prevValue, name) {
            this.setState({rating: nextValue});
            }

        handleSubmit = (e) => {
                e.preventDefault();
                const reviewer = localStorage.id
                const reviewee = this.props.location.state.user_id
                

                fetch('http://localhost:3000/reviews', {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( {
                        rating: parseInt(this.state.rating),
                        comment: this.state.comment,
                        reviewer_id: reviewer,
                        reviewee_id: reviewee
                    })})
                    
                    this.setState({rating: "", comment: ""})
                    // window.location.reload(false)
            }
                    
        renderReviews = () => {
            return this.state.reviewing_users.map(function(review) {
                return <div><StarRatingComponent 
                className="usersRatings"
                starCount={5}
                editing={false}
                value={review.rating}
                /> <p>{review.comment} {review.created_at}</p></div>
            })
        }



        renderMyReviewers =() => {
            return this.state.myReviewers.map(function(user) {
                return <div><p>{user.reviewername}</p> <p><StarRatingComponent 
                className="usersRatings"
                starCount={5}
                editing={false}
                value={user.rating}
                /> </p> <p>{user.comment}</p><p>{user.dateposted}</p><div id="reviewerDivider"></div></div>
            })
        }

    render() { 
        console.log(this.myReviewers())
        
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


                    <div id="userDetails">
                        <h2 id="username">{this.props.location.state.name}</h2>
                        <p style={{color: 'white'}}>{this.props.location.state.title}</p>
                        <p style={{color: 'white'}}><Link to={{
                        pathname: '/companies/profile',
                        state: { 
                            name: this.state.company.name,
                            address: this.state.company.address,
                            phone_number: this.state.company.phone_number,
                            company_id: this.state.company.id,
                            logo_url: this.state.company.logo_url

                        }
                    }}>{this.state.company.name}</Link></p>
                        <p style={{color: 'white'}}>{this.state.company.address}</p>
                        <div id="stars">
                        <StarRatingComponent 
                            className="myRating"
                            starCount={5}
                            editing={false}
                            value={this.state.myRating}
                            />
                            <h1 id="myRatingNum">{this.state.myRating}</h1>
                        </div>
                    </div>
                        
                </div>

                <div id="leaveReview">
                        <form id="reviewform" onSubmit={this.handleSubmit} >
                            {/* <StarRatings rating={this.state.rating} starRatedColor="blue" onChange={this.handleChange}className="ratinginput" numberOfStars={5}name='rating' /> */}
                            {/* <input onChange={this.handleChange} value={this.state.rating} name="rating" className="ratinginput"  placeholder="1 out of 5" required /> */}

                            

                            <label className="reviewLabel">Leave a Review:</label><br/>
                            <StarRatingComponent 
                                name="rating" 
                                starCount={5}
                                value={this.state.rating}
                                onChange={this.handleChange}
                                onStarClick={this.onStarClick.bind(this)}
                                className="ratinginput"
                                />
                            <textarea onChange={this.handleChange} value={this.state.comment} name="comment" className="commentinput"   required />

                            <input className="reviewSubmit" type="submit" value="Submit"/>
                            </form>

                </div>

                <div id="reviews" >
                        {/* {this.renderReivewNames()}
                        {this.renderReviews()} */}
                        <div id="reviewerCommentsAndRatings">{this.renderMyReviewers()}</div>
                </div>

                <div id="footer">
                    
                </div>
                
            </div>
        );
    }
}

export default UserProfile;



