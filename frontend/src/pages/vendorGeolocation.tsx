import React from 'react';
import './vendorProfile.css';
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import { setVendorLocation } from '../api';
import map from "../img/map.png";

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br/><br/>
                <input className="vendorProfile" type="image" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1>Vendor Geolocation</h1>
                <br/>
            </div>
        )
    }
}

class Description extends React.Component {
    
    state = {
        desc: ""
    };

    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const { desc } = this.state;
        setVendorLocation(desc);
    }

    render() {
    const { desc } = this.state;
    return (
        <div>
            <div className="container">
                <h2>Current location</h2>
                <p>757 Swanston St, Parkville VIC 3010</p>
            </div>

            <form onSubmit={this.handleSubmit}>
                <div className="container">
                <label id="location"><h2>Location Description</h2></label>
                <input className="vendorProfile" type="text" placeholder="Enter text..." name="desc" value={desc} onChange={this.handleChange} required />
            </div>
                <br/><br/><br/>
                <button type="submit" value="open" className="open">Open Store</button>
            </form>
        </div>
    )}
}

class VendorGeolocation extends React.Component {
    render() {
        return (
            <div>
                <div className="split left">
                    <img className="vendorProfile" alt="map" src={map} />
                </div>

                <div className="split right">
                    <Header />
                    <Description />
                </div>
            </div>
        )
    }
}

export default VendorGeolocation;