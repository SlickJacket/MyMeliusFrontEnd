import React, { Component } from 'react';
import './ProfileCSS.css';
import { HamburgerArrow } from 'react-animated-burgers'
import ReactSearchBox from 'react-search-box'


class ProfilePage extends Component {
        state = {
        isActive: false
        }
    
        toggleButton = () => {
            this.setState({
            isActive: !this.state.isActive
        })
        }

    render() { 

        return ( 
            <div>
                <div id="profileHeader">
                    <img src="../Melius_Logo2Black.png" id="logo" />
                    <h1 id="profileCompName">Melius</h1>

                    <div className="searchbar" >
                    <ReactSearchBox  placeholder=""value="Doe"data={this.data}callback={record => console.log(record)}/>
                    </div>

                    <HamburgerArrow id="hamburger" isActive={this.state.isActive} toggleButton={this.toggleButton}  />
                    
                </div>

                <div id="leaveReview">

                </div>

                <div id="reviews">

                </div>

                <div id="footer">
                    
                </div>
                
            </div>
        );
    }
}

export default ProfilePage;