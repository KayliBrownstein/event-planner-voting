import React, { Component } from 'react';
import EventShowTile from '../components/EventShowTile';
import AllEvents from '../components/AllEvents';

class EventShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      event: {},
      name: '',
      description: '',
      cutoff_time: ''
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    this.getEventData();
  }

  getEventData(){
    let eventId = this.props.params.id;
    fetch(`/api/v1/events/${eventId}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ event: responseData })
    });
  }

  handleDelete(){
    let eventId = this.props.params.id;
    fetch(`/api/v1/events/${eventId}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    })
  }

  render(){
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      });
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return(
        <div className="column row centered">
          <EventShowTile
            key = {this.state.event.id}
            id = {this.state.event.id}
            name = {this.state.event.name}
            description = {this.state.event.description}
            cutoff_time = {this.state.event.cutoff_time}
          />
        </div>
    )
  }
}

export default EventShowContainer;
