import React, { Component } from 'react';
import EventShowTile from '../components/EventShowTile';
import AllLocations from '../components/AllLocations';
import NewLocationForm from '../components/NewLocationForm';
// import AllDatetimes from '../components/AllDatetimes';
// import NewDatetimeForm from '../components/NewDatetimeForm';

class EventShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      event: {},
      datetimes: [],
      locations: []
    }
    this.handleEventDelete = this.handleEventDelete.bind(this);
  }

  componentDidMount(){
    this.getEventData();
    this.getLocationData();
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

  getLocationData(){
    let eventId = this.props.params.id
    fetch(`/api/v1/events/${eventId}/locations`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ locations: responseData })
    })
  }

  // getDatetimesData(){
  //   let eventId = this.props.params.id
  //   fetch(`/api/v1/events/${eventId}/datetimes`, {
  //     method: 'GET'
  //   })
  //   .then(response => response.json())
  //   .then(responseData => {
  //     this.setState({ datetimes: responseData })
  //   })
  // }

  handleEventDelete(){
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
      <div>
        <div className="column row">
          <EventShowTile
            key = {this.state.event.id}
            id = {this.state.event.id}
            name = {this.state.event.name}
            description = {this.state.event.description}
            cutoff_time = {this.state.event.cutoff_time}
            suggested_date = {this.state.event.suggested_date}
            suggested_time = {this.state.event.suggested_time}
            suggested_location = {this.state.event.suggested_location}
          />
          <AllLocations
          locations={this.state.locations}
          id = {this.state.event.id}

          />
        </div>
      </div>
    )
  }
}

export default EventShowContainer;
