import React, { Component } from 'react';
import AllEvents from '../components/AllEvents';

class IndexContainer extends Component {
  constructor(props){
    super(props);
      this.state = {
        events: [],
        user: {}
      }
    }

  componentDidMount(){
    this.getUserData();
  }

  getUserData(){
    fetch(`/api/v1/profiles`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ user: responseData.user, events: responseData.events });
      });
  }

  render(){
    return(
      <div className="column row">
        <AllEvents
          events={this.state.events}
        />
      </div>
    )
  }
}

export default IndexContainer;
