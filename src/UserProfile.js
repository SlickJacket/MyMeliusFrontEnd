import React, { Component } from 'react';
import './ProfileCSS.css';
import { HamburgerArrow } from 'react-animated-burgers'
import ReactSearchBox from 'react-search-box'


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
        my_rating: ""
        }

        componentDidMount() {
            if (localStorage.id == this.props.location.state.user_id) {
                
                this.props.history.push('/profile')
            } else {
                fetch(`http://localhost:3000/users/${this.props.location.state.user_id}`)
                .then(res => res.json())
                .then(user => this.setState({company: user.company, reviewees: user.reviewees, reviewers: user.reviewers, reviewing_users: user.reviewing_users, reviewed_users: user.reviewed_users}))

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

        handleChange = (e) => {
            this.setState({[e.target.name]: e.target.value})
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

                    let array = []

                    this.state.reviewing_users.map(function(review) {
                        
                        array.push(review.rating)
                    })

                    this.setState({ratings: array})
                    console.log(array)
                    
                //     fetch(`http://localhost:3000/users/${this.props.location.state.user_id}`, {
                //     method: "PATCH",
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Accept': 'application/json'
                //     },
                //     body: JSON.stringify({ 
                //             "user_rating": this.renderAverageRating()
                //     })
                // })


            }
                    
        
        renderReviews = () => {

            return this.state.reviewing_users.map(function(review) {
                return <p style={{color: "white"}} >{review.rating} {review.comment}</p>
            })
        }

        renderReivewNames = () => {
            return this.state.reviewers.map(function(user) {
                return <p style={{color: "white"}}>{user.name}</p>
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
        // console.log(localStorage.id);
        // console.log(this.props.location.state.user_id)
        // console.log(this.state.comment)
        // console.log(this.state.ratings)
        // console.log(this.state.reviewing_users)

        
        
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
                        <p style={{color: 'white'}}>{this.state.company.name}</p>
                        <p style={{color: 'white'}}>{this.state.company.address}</p>
                        <p style={{color: 'yellow'}}>{this.renderAverageRating()}</p>
                    </div>
                        
                </div>

                <div id="leaveReview">
                        <form id="reviewform" onSubmit={this.handleSubmit} >
                            <label>Leave a rating</label>
                            <input onChange={this.handleChange} value={this.state.rating} name="rating" className="ratinginput"  placeholder="1 out of 5" required />

                            <label>Leave a Review</label>
                            <input onChange={this.handleChange} value={this.state.comment} name="comment" className="commentinput"   required />

                            <input  type="submit" value="Submit"/>
                            </form>

                </div>

                <div id="reviews">
                        <div  id="reviewerNames">{this.renderReivewNames()}</div>
                
                        <div id="reviewerCommentsAndRatings">{this.renderReviews()}</div>
                </div>

                <div id="footer">
                    
                </div>
                
            </div>
        );
    }
}

export default UserProfile;



