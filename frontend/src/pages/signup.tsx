/* Import the required libraries and types */
import React from 'react';

/* Import components */
import './profile.css';
import { customerRegister } from "../api";
import history from "../history";
import passwordSchema from "../models/passwordSchema";

/* Component for Customer Signup */
class CustomerSignup extends React.Component {

    state = {
        email: "", 
        givenName: "", 
        familyName: "", 
        password: "",
        confirm: ""
    }

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void; }) => {
        const { email,  givenName, familyName, password, confirm } = this.state;
        event.preventDefault();

        /* Confirm password is same and validate if it fulfills criteria */
        if (password === confirm) {
            if (passwordSchema.validate(password)) {
                customerRegister(email, givenName, familyName, password);
            } else {
                alert("Please enter at least 1 alphabet character (upper or lower case A-Z), at least one numerical digit (0-9), length of at least 8 characters")
            }
        } else {
            alert("Please enter the same password");
        }
    }

    render() {
        const { email,  givenName, familyName, password, confirm } = this.state;

        return (
            <div>
                <div className="titleLogin">
                    <h1>Sign up</h1>
                    <br />
                    <h2>Already have an account? </h2>
                    <button className="signup" type="submit" value="signup" onClick={() => history.push(`/customer/login`)}>
                        <h2>Log in here</h2>
                    </button>
                </div>
                <br />

                <div className="containerProfile">
                    <form onSubmit={this.handleSubmit}> 
                        <input id="first" type="text" name="givenName" placeholder="given name" value={givenName} onChange={this.handleChange} required/>
                        <br/><br/>
                        <input id="last" type="text" name="familyName" placeholder="family name" value={familyName} onChange={this.handleChange} required/>
                        <br/><br/>
                        <input id="email" type="text" name="email" placeholder="email" value={email} onChange={this.handleChange} required/>
                        <br/><br/>
                        <input id="password" type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} required/>
                        <br/><br/>
                        <p className="menu-p">Please enter at least 1 alphabetical character (upper or lower case A-Z), at least one numerical digit (0-9), length of at least 8 characters</p>
                        <br/><br/>
                        <input id="confirm password" type="password" name="confirm" placeholder="confirm password" value={confirm} onChange={this.handleChange} required/>
                        <br/><br/>
                        <button className="login" type="submit" value="signup">Sign up</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CustomerSignup;
    