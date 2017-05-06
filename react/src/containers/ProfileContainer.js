import React, { Component } from 'react';
import { Link } from 'react-router';

class ProfileContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    fetch(`/api/v1/users.json`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ user: responseData.current_user })
    });
  }

  render() {
    return(
      <div className="column row">
        <div className="userinfoBox small-12 medium-8 large-6 small-centered medium-centered large-centered columns">
        <Link to='/events'>
        <button type='button' className="button" id='back-button'>Back to Events</button>
        </Link>
          <h1 className="profile-header">My Profile</h1>
          <img src={this.state.user.avatar} id='avatar' width='200' />
          <p className="userinfo">Username: {this.state.user.username}</p>
          <p className="userinfo">First Name: {this.state.user.first_name}</p>
          <p className="userinfo">Last Name: {this.state.user.last_name}</p>
          <p className="userinfo">Email: {this.state.user.email}</p>
        </div>
      </div>
    )
  }
}

export default ProfileContainer;
