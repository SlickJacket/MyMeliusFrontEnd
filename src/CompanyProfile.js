import React, { Component } from 'react';
import { HamburgerArrow } from 'react-animated-burgers'
import ReactSearchBox from 'react-search-box'
import './CompanyProfileCss.css'

class CompanyProfile extends Component {
    
        state = {

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

    render() { 
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
                        <h3 id="companyName">Company Name</h3>
                        
                </div>

                <div id="reviews">

                </div>

                <div id="footer">
                    
                </div>
                
            </div>
            );
    }
}

export default CompanyProfile;