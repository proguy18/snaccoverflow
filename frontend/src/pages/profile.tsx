import React from 'react';
import './profile.css';
import { customerProfile, customerLogout } from '../api';
import history from '../history';
import pencilEdit from '../img/penEdit.png';

class Profile extends React.Component {
    state = {   
        details: [] as any,
    }

    componentWillMount() {
        customerProfile().then(
            (response) => {
                console.log(response);
            },
            (error) => {
                alert("Please login");
                history.push("/customer/login");
                console.log(error);
            }
        );
    }

    componentDidMount() {
        customerProfile().then(
            (response) => {
                var data = response.data;
                this.setState({ details: data });
                console.log(response);
            }
        );
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        customerLogout();
        history.push('/customer/login');
    }

    render() {
        const {details} = this.state;
        return (
            <div className="titleLogin">
                <h1 className="titleLog">Profile</h1>
                <button className="cancel" type="submit" value="edit" onClick={() => history.push(`/customer/profile/amend`)}>
                    <input type="image" className="edit" src={pencilEdit}/>
                    Edit Profile
                </button><br/>
                <h3>ID</h3>
                <p className="time">{details._id}</p>
                <h3>Email</h3>
                <p className="time">{details.email}</p>
                <h3>Given Name</h3>
                <p className="time">{details.givenName}</p>
                <h3>Family Name</h3>
                <p className="time">{details.familyName}</p>
                <br />
                <button className="login" type="submit" onClick={this.handleSubmit}>
                    <h2 className="click">Log out</h2>
                </button>
            </div>
        )
    }
}

export default Profile;