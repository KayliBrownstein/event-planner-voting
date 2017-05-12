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
      state: '',
      eventId: this.props.params.id
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
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  componentDidMount(){
    this.getEventData();
    this.getLocationData();
    this.getDatetimeData();
  }

  getEventData(){
    fetch(`/api/v1/events/${this.state.eventId}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ event: responseData })
    });
  }

  getLocationData(){
    fetch(`/api/v1/events/${this.state.eventId}/locations`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ locations: responseData })
    })
  }

  getDatetimeData(){
    fetch(`/api/v1/events/${this.state.eventId}/datetimes`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ datetimes: responseData })
    })
  }

  handleEventDelete(){
    if (confirm("Are you sure?")) {
    fetch(`/api/v1/events/${this.state.eventId}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    })
    }
  }

  sendInviteInput(invitePayload) {
    fetch(`/api/v1/events/${this.state.eventId}/invites`, {
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

 validateDateChange(date){
   if (date === '' || date === ' ') {
     let newError = { date: 'Date should not be blank' };
     this.setState({ errors: Object.assign(this.state.errors, newError) });
     return false;
   } else {
     let errorState = this.state.errors;
     delete errorState.date;
     this.setState({ errors: errorState });
     return true;
   }
 }

 handleTimeChange(event){
   this.setState({ time: event.target.value });
 }

 validateTimeChange(time){
   if (time === '' || time === ' ') {
     let newError = { time: 'Time should not be blank' };
     this.setState({ errors: Object.assign(this.state.errors, newError) });
     return false;
   } else {
     let errorState = this.state.errors;
     delete errorState.time;
     this.setState({ errors: errorState });
     return true;
   }
 }

 handleDatetimeSubmit(event){
   event.preventDefault();
   if (
     this.validateDateChange(this.state.date),
     this.validateTimeChange(this.state.time)
   ){
   let datetimePayload = {
     date: this.state.date,
     time: this.state.time
   };
   this.sendDatetimeInput(datetimePayload);
   this.handleClearForm();
  }
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

 validateNameChange(name){
   if (name === '' || name === ' ') {
     let newError = { name: 'Name should not be blank' };
     this.setState({ errors: Object.assign(this.state.errors, newError) });
     return false;
   } else {
     let errorState = this.state.errors;
     delete errorState.name;
     this.setState({ errors: errorState });
     return true;
   }
 }

 handleDescriptionChange(event){
   this.setState({ description: event.target.value });
 }

 validateDescriptionChange(description){
   if (description === '' || description === ' ') {
     let newError = { description: 'Description should not be blank' };
     this.setState({ errors: Object.assign(this.state.errors, newError) });
     return false;
   } else {
     let errorState = this.state.errors;
     delete errorState.description;
     this.setState({ errors: errorState });
     return true;
   }
 }
 handleAddressChange(event){
   this.setState({ street_address: event.target.value });
 }

 validateAddressChange(street_address){
   if (street_address === '' || street_address === ' ') {
     let newError = { street_address: 'Address should not be blank' };
     this.setState({ errors: Object.assign(this.state.errors, newError) });
     return false;
   } else {
     let errorState = this.state.errors;
     delete errorState.street_address;
     this.setState({ errors: errorState });
     return true;
   }
 }

 handleCityChange(event){
   this.setState({ city: event.target.value });
 }

 validateCityChange(city){
   if (city === '' || city === ' ') {
     let newError = { city: 'City should not be blank' };
     this.setState({ errors: Object.assign(this.state.errors, newError) });
     return false;
   } else {
     let errorState = this.state.errors;
     delete errorState.city;
     this.setState({ errors: errorState });
     return true;
   }
 }

 handleStateChange(event){
   this.setState({ state: event.target.value });
 }

 validateStateChange(state){
   if (state === '' || state === ' ') {
     let newError = { state: 'State should not be blank' };
     this.setState({ errors: Object.assign(this.state.errors, newError) });
     return false;
   } else {
     let errorState = this.state.errors;
     delete errorState.state;
     this.setState({ errors: errorState });
     return true;
   }
 }

 handleLocationSubmit(event){
   event.preventDefault();
   if (
     this.validateNameChange(this.state.name),
     this.validateDescriptionChange(this.state.description),
     this.validateAddressChange(this.state.street_address),
     this.validateCityChange(this.state.city),
     this.validateStateChange(this.state.state)
   ){
   let locationPayload = {
     name: this.state.name,
     description: this.state.description,
     street_address: this.state.street_address,
     city: this.state.city,
     state: this.state.state
   };
   this.sendLocationInput(locationPayload);
   this.handleClearForm();
 }
 }

 sendLocationInput(locationPayload){
   fetch(`/api/v1/events/${this.state.eventId}/locations`, {
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
    fetch(`/api/v1/events/${this.state.eventId}/datetimes`, {
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

  handleClearForm(){
    this.setState({
      name: '',
      description: '',
      street_address: '',
      city: '',
      state: '',
      date: '',
      time: '',
      locationformToggle: false,
      datetimeformToggle: false
    })
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

        <div className="small-12 medium-12 large-8 large-centered columns event-show-all">
          <EventShowTile
            eventEnded = {this.state.event.event && this.state.event.event_ended}
            key = {this.state.event.id}
            event = {this.state.event.event}
            user_id = {this.state.event.event && this.state.event.event.user_id}
            eventId={this.state.eventId}
            id = {this.state.event.event && this.state.event.event.id}
            name = {this.state.event.event && this.state.event.event.name}
            description = {this.state.event.event && this.state.event.event.description}
            cutoff_time = {this.state.event.event && this.state.event.event.cutoff_time}
            handleDelete = {this.handleEventDelete}
          />
          </div>
          <div className="small-12 medium-12 large-8 large-centered columns">
          {errorDiv}
          <AllLocations
            eventEnded = {this.state.event.event && this.state.event.event_ended}
            locations={this.state.locations}
            id = {this.state.eventId}
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
            eventEnded = {this.state.event.event && this.state.event.event_ended}
            datetimes={this.state.datetimes}
            id={this.state.eventId}
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
