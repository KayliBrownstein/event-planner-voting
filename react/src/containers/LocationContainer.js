import React, { Component } from 'react';
import AllLocations from '../components/AllLocations';

class LocationContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      locations: [],
      street_address: '',
      description: '',
      city: '',
      state: '',
      locationformToggle: false
    }
    this.handleLocationFormButtonClick = this.handleLocationFormButtonClick.bind(this);
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentDidMount(){
    this.getLocationData();
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
      state: this.state.state,
      locations: []
    };
    this.sendLocationInput(locationPayload);
  }


  sendLocationInput(locationPayload){
    let eventId = this.props.eventId;
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

  getLocationData(){
    debugger;
    let eventId = this.props.eventId
    fetch(`/api/v1/events/${eventId}/locations`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ locations: responseData })
    })
  }

  render(){
    let locationclassName;
    if (this.state.locationformToggle) {
      locationclassName = 'selected'
    } else {
      locationclassName = 'hidden'
    };

    return(
      <AllLocations
        locations={this.state.locations}
        id = {this.props.id}
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
    )
  }
}

export default LocationContainer;
