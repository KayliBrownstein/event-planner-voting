import React, { Component } from 'react';
import EventShowTile from '../components/EventShowTile';
import AllLocations from '../components/AllLocations';
import AllDatetimes from '../components/AllDatetimes';

class EventShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      event: {},
      datetimes: [],
      locations: [],
      email: '',
      invites: [],
      formToggle: false,
      date: '',
      time: ''
    }
    this.handleEventDelete = this.handleEventDelete.bind(this);
    this.handleDatetimeFormButtonClick = this.handleDatetimeFormButtonClick.bind(this)
    this.handleDatetimeSubmit = this.handleDatetimeSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }

  componentDidMount(){
    this.getEventData();
    this.getLocationData();
    this.getDatetimeData();
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

  getDatetimeData(){
    let eventId = this.props.params.id
    fetch(`/api/v1/events/${eventId}/datetimes`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ datetimes: responseData })
    })
  }

  handleEventDelete(){
    let eventId = this.state.event.id;
    fetch(`/api/v1/events/${eventId}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    })
  }

  sendInput(invitePayload) {
    fetch(`/api/v1/events/${eventId}/invites`, {
      credentials: 'same-origin',
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invitePayload)
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ invites: [...this.state.invites, responseData] });
    });
 }

 handleDatetimeFormButtonClick(){
   if (this.state.formToggle == false) {
     this.setState({
       formToggle: true,
     })
   } else {
     this.setState({
       formToggle: false,
     })
   }
 }

 handleDateChange(event){
   this.setState({ date: event.target.value })
 }

 handleTimeChange(event){
   this.setState({ time: event.target.value })
 }

 handleDatetimeSubmit(event){
   event.preventDefault();
   let datetimePayload = {
     date: this.state.date,
     time: this.state.time
   }
   this.sendInput(datetimePayload);
   this.getDatetimeData();
 }

 sendInput(datetimePayload){
   let eventId = this.props.params.id;
   fetch(`/api/v1/events/${eventId}/datetimes`, {
     credentials: 'same-origin',
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(datetimePayload)
   })
   .then(response => response.json())
   .then(responseData => {
     this.setState({ datetimes: [...this.state.datetimes, responseData] });
   });
 }

  render(){
    let className;
    if (this.state.formToggle) {
      className = 'selected'
    } else {
      className = 'hidden'
    };

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
            handleDelete = {this.handleEventDelete}
          />
          <AllLocations
            locations={this.state.locations}
            id = {this.state.event.id}
          />

          <AllDatetimes
            handleDatetimeSubmit = {this.handleDatetimeSubmit}
            handleDateChange = {this.handleDateChange}
            handleTimeChange = {this.handleTimeChange}
            handleDatetimeFormButtonClick = {this.handleDatetimeFormButtonClick}
            datetimes={this.state.datetimes}
            date={this.state.date}
            time={this.state.time}
            id={this.state.event.id}
            className={className}
          />
        </div>
      </div>
    )
  }
}

export default EventShowContainer;
