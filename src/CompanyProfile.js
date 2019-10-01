import React, { Component } from 'react';
import { HamburgerArrow } from 'react-animated-burgers'
import ReactSearchBox from 'react-search-box'
import './CompanyProfileCss.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class CompanyProfile extends Component {
    
        state = {
            name: "", 
            address: "", 
            phone_number: "", 
            logo_url: "",
            ratings: [],
            users: [],
            rating: ""

        }


        componentDidMount() {
            
            fetch(`http://localhost:3000/companies/${this.props.location.state.company_id}`)
            .then(res => res.json())
            .then(c => { this.setState({name: c.name, address: c.address, phone_number: c.phone_number, logo_url: c.logo_url, users: c.users})
            
            fetch(`http://localhost:3000/ratings/${this.props.location.state.company_id}`)
            .then(res => res.json())
            .then(data => this.setState({ ratings: data}))
            
            
        })

        

    
            
        
        }


        handleClick = () => {
            localStorage.clear()
            this.props.history.push('/loginsignup')
        } 

        handleButtonClick = (e) => {
            e.preventDefault();

            fetch('http://localhost:3000/companies')
                .then(response => response.json())
                .then(data => console.log(data));
        }

        // renderUsers = () => {

            
            

        //     return this.state.users.map(function(user) {

                
                
        //     return <div><p style={{color: "red"}}><Link to={{
        //         pathname: '/users',
        //         state: { 
        //             name: user.name,
        //             email: user.email,
        //             title: user.title,
        //             company_id: user.company_id,
        //             user_id: user.id,
        //             user_rating: user.user_rating,
        //             average: user.average

        //         }
        //     }}>{user.name}</Link></p> <p style={{color: "red"}}>{user.title}</p> <p style={{color: "yellow"}}>5</p></div>
        //     })
        // }


        renderUsers = () => {
            return this.state.ratings.map(function(user) {
                return <div><p style={{color: "red"}}><Link to={{
                    pathname: '/users',
                    state: { 
                        name: user.name,
                        email: user.email,
                        title: user.title,
                        company_id: user.company_id,
                        user_id: user.id,
                        user_rating: user.user_rating,
                        average: user.average
    
                    }
                }}>{user.name}</Link></p> <p style={{color: "red"}}>{user.title}</p> <p style={{color: "yellow"}}>{user.rating}</p></div>
        })
    }



    render() { 

        // console.log(this.renderUsersAndRatings())
        // console.log(this.state.users)
        // console.log(this.state.ratings[0])

        return ( 
            <div>
            <div id="head">
                    <img src="../Melius_Logo2.png" id="logo" />
                    <h1>Melius</h1>

                    <button className="logout" onClick={this.handleClick}>Logout</button>

                    <div className="searchbar" >
                    <ReactSearchBox  placeholder=""value="Doe"data={this.data}callback={record => console.log(record)}/>
                    </div>

                    <HamburgerArrow id="hamburgerorange" isActive={this.state.isActive} toggleButton={this.toggleButton}  />
                    
                    <button onClick={this.handleButtonClick}></button>

                </div>
                <div id="companyMain">
                        <h3 id="companyName">{this.props.location.state.name}</h3>
                        
                </div>

                <div id="reviews">
                        <h2 id="emploeeTitle">Employees</h2>
                        <div>{this.renderUsers()}</div>
                        
                </div>

                <div id="footer">
                    
                </div>
                
            </div>
            );
    }
}

export default CompanyProfile;