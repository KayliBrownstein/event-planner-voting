import React, { Component } from 'react';
import AllEvents from '../components/AllEvents';
import NewEventContainer from './NewEventContainer';

class IndexContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    this.getEventData();
  }

  getEventData() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ events: responseData.events })
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
