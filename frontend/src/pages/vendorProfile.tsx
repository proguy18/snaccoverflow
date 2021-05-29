/* Import the required libraries and types */
import React from 'react';

/* Import components */
import './vendorProfile.css';
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import { vendorProfile, vendorLogout, setVendorAvailability } from '../api';

/* Header component of Vendor Profile Page */
class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br/><br/>
                <input className="vendorProfile" type="image" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1>Vendor Profile</h1>
                <br/>
            </div>
        )
    }
}

/* Content component of Vendor Profile Page */
class Description extends React.Component {
    
    state = {
        details: [] as any,
        geolocation: [] as any
    }

    /* During on page */
    componentDidMount() {
        /* Get vendor's profile */
        vendorProfile().then(
            (response) => {
                var data = response.data;
                this.setState({details: data, geolocation: data.geolocation});
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    /* Handle when click on button */
    handleClick() {
        /* Check if can close store. Then push new entry to history */
        setVendorAvailability().then(
            (response) => {
                if (response.status === 200) {
                    history.push("/vendor/login");
                    vendorLogout();
                } 
                console.log(response);
            })
            .catch(error=>{ 
                if (error.response) {
                    alert("Please fulfill all order!"); 
                    history.goBack();
                }
                console.log(error);
            }
        )
    }

    render() {
        const { details, geolocation } = this.state;

        return (
            <div>
                <div className="container">
                    <h2>Current location</h2>
                    <p>{geolocation[0]},{geolocation[1]}</p>
                </div>

                <div className="container">
                    <h2>Location Description</h2>
                    <p>{details.locationDescription}</p>
                    <br/><br/><br/>
                    <button type="button" className="closeStore" onClick={this.handleClick}>Close Store</button>
                </div>
            </div>
        )
    }
}

/* Render all components on vendor profile page */
class VendorProfile extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Description />
            </div>
        )
    }
}

export default VendorProfile;
