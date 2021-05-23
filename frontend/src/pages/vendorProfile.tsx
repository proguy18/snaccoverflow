import React from 'react';
import './vendorProfile.css';
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import { vendorProfile, vendorLogout, setVendorAvailability } from '../api';

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

class Description extends React.Component {
    
    state = {
        details: [] as any,
        geolocation: [-37.7999432,144.9616192],
    };

    componentDidMount() {
        vendorProfile().then(
            (response) => {
                var data = response.data;
                this.setState({details: data});
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClick() {
        history.push("/vendor/login");
        setVendorAvailability();
        vendorLogout();
    }

    render() {
    const { details } = this.state;
    return (
        <div>
            <div className="container">
                <h2>Current location</h2>
                <p>{details.geolocation}</p>
            </div>

            <div className="container">
                <h2>Location Description</h2>
                <p>{details.locationDescription}</p>
            </div>
            <br/><br/><br/>
            <button type="button" className="closeStore" onClick={this.handleClick}>Close Store</button>
        </div>
    )}
}

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

export default VendorProfile