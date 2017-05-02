import React, { Component } from 'react';

class ProfileContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    fetch(`/api/v1/profiles`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ user: responseData.user })
    });
  }

  render() {
    return(
      <div className="column row">
      <p>{this.state.user.username}</p>
      <p>{this.state.user.first_name}</p>

      </div>
    )
  }
}

export default ProfileContainer;
