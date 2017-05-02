import React, { Component } from 'react';

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
        <p>{this.state.user.username}</p>
        <p>{this.state.user.first_name}</p>
        <p>{this.state.user.last_name}</p>
        <p>{this.state.user.email}</p>
      </div>
    )
  }
}

export default ProfileContainer;
