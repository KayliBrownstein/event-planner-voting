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
      locationformToggle: false,
      date: '',
      time: '',
      datetimeformToggle: false,
      name: '',
      street_address: '',
      description: '',
      city: '',
      state: ''
    }
    this.handleEventDelete = this.handleEventDelete.bind(this);
    this.handleDatetimeFormButtonClick = this.handleDatetimeFormButtonClick.bind(this);
    this.handleDatetimeSubmit = this.handleDatetimeSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleLocationFormButtonClick = this.handleLocationFormButtonClick.bind(this);
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
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

  sendInviteInput(invitePayload) {
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
   if (this.state.datetimeformToggle == false) {
     this.setState({
       datetimeformToggle: true
     })
   } else {
     this.setState({
       datetimeformToggle: false
     })
   }
 }

 handleDateChange(event){
   this.setState({ date: event.target.value });
 }

 handleTimeChange(event){
   this.setState({ time: event.target.value });
 }

 handleDatetimeSubmit(event){
   event.preventDefault();
   let datetimePayload = {
     date: this.state.date,
     time: this.state.time
   };
   this.sendDatetimeInput(datetimePayload);
   this.getDatetimeData();
 }

 handleLocationFormButtonClick(){
   if (this.state.locationformToggle == false) {
     this.setState({
       locationformToggle: true
     })
   } else {
     this.setState({
       locationformToggle: false
     })
   }
 }

 handleNameChange(event){
   this.setState({ name: event.target.value });
 }

 handleDescriptionChange(event){
   this.setState({ description: event.target.value });
 }

 handleAddressChange(event){
   this.setState({ street_address: event.target.value });
 }

 handleCityChange(event){
   this.setState({ city: event.target.value });
 }

 handleStateChange(event){
   this.setState({ state: event.target.value });
 }

 handleLocationSubmit(event){
   event.preventDefault();
   let locationPayload = {
     name: this.state.name,
     description: this.state.description,
     street_address: this.state.street_address,
     city: this.state.city,
     state: this.state.state
   };
   this.sendLocationInput(locationPayload);
 }

 sendLocationInput(locationPayload){
   let eventId = this.props.params.id;
   fetch(`/api/v1/events/${eventId}/locations`, {
     credentials: 'same-origin',
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(locationPayload)
   })
   .then(response => response.json())
   .then(responseData => {
     this.setState({ locations: [...this.state.locations, responseData] });
   });
 }

  sendDatetimeInput(datetimePayload){
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
    let datetimeclassName;
    if (this.state.datetimeformToggle) {
      datetimeclassName = 'selected'
    } else {
      datetimeclassName = 'hidden'
    };

    let locationclassName;
    if (this.state.locationformToggle) {
      locationclassName = 'selected'
    } else {
      locationclassName = 'hidden'
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
            name={this.state.name}
            street_address={this.state.street_address}
            city={this.state.city}
            state={this.state.state}
            description={this.state.description}
            className={locationclassName}

            handleLocationSubmit = {this.handleLocationSubmit}
            handleNameChange = {this.handleNameChange}
            handleDescriptionChange = {this.handleDescriptionChange}
            handleAddressChange = {this.handleAddressChange}
            handleCityChange = {this.handleCityChange}
            handleStateChange = {this.handleStateChange}
            handleLocationFormButtonClick = {this.handleLocationFormButtonClick}
          />

          <AllDatetimes
            datetimes={this.state.datetimes}
            id={this.state.event.id}
            date={this.state.date}
            time={this.state.time}
            className={datetimeclassName}

            handleDatetimeSubmit = {this.handleDatetimeSubmit}
            handleDateChange = {this.handleDateChange}
            handleTimeChange = {this.handleTimeChange}
            handleDatetimeFormButtonClick = {this.handleDatetimeFormButtonClick}
          />
        </div>
      </div>
    )
  }
}

export default EventShowContainer;
