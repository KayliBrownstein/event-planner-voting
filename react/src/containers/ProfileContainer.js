import React, { Component } from 'react';
import { Link } from 'react-router';

class ProfileContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      avatar: {}
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    fetch(`/api/v1/users.json`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          user: responseData.current_user,
          avatar: responseData.current_user.avatar
        })
    });
  }

  render() {
    return(
      <div>
      <Link to='/events'>
      <button type='button' className="button" id='back-button'>Back to Events</button>
      </Link>
        <div className="row" id='user-profile-area'>
          <div className='small-12 large-4 small-centered large-centered columns' id='avatar-area'>
            <img src={this.state.avatar.url} id='avatar' />
          </div>
          <div className='small-12 large-6 small-centered large-centered columns' id='info-area'>
            <h3>@{this.state.user.username}</h3>
            <h5>{this.state.user.first_name} {this.state.user.last_name}</h5>
            <h5>{this.state.user.email}</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileContainer;
