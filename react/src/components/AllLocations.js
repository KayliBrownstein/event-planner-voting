import React, { Component } from 'react';
import LocationTile from './LocationTile';
import NewLocationForm from './NewLocationForm';

class AllLocations extends Component {
  constructor(props){
    super(props);
    this.state = {
      locations: [],
      formToggle: false,
      name: '',
      street_address: '',
      description: '',
      city: '',
      state: ''
    };
    this.handleLocationFormButtonClick = this.handleLocationFormButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.updateLocationVote = this.updateLocationVote.bind(this);
  }

  // componentDidMount(){
  //   this.getLocationsInfo();
  // }

  updateLocationVote(location_id, upvote){
    let votePayload = {
      location_vote: {
        upvote: upvote
      }
    }
    let eventId = this.props.id;
    let locationId = location_id;

    fetch(`/api/v1/events/${eventId}/locations/${locationId}`, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(votePayload)
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        locations: body.locations,
      });
      this.getLocationVote(location_id);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmit(event){
    event.preventDefault();
    let locationPayload = {
      name: this.state.name,
      description: this.state.description,
      street_address: this.state.street_address,
      city: this.state.city,
      state: this.state.state
    }
    this.sendInput(locationPayload);
  }

  sendInput(locationPayload){
    let eventId = this.props.id;
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

  getLocationVote(location_id){
    let eventId = this.props.id;
    let locationId = location_id;

    fetch(`/api/v1/events/${eventId}/locations/${locationId}`, {
      credentials: 'same-origin',
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ votes: responseData.location_votes })
    })
  }

  handleLocationFormButtonClick(){
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

  handleNameChange(event){
    this.setState({ name: event.target.value })
  }

  handleDescriptionChange(event){
    this.setState({ description: event.target.value })
  }

  handleAddressChange(event){
    this.setState({ street_address: event.target.value })
  }

  handleCityChange(event){
    this.setState({ city: event.target.value })
  }

  handleStateChange(event){
    this.setState({ state: event.target.value })
  }

  render(){
    let className;
    if (this.state.formToggle) {
      className = 'selected'
    } else {
      className = 'hidden'
    };

    let locations = this.props.locations.map((location) => {
      let upvoteHandler = () => {
        this.updateLocationVote(location.id, true)
      }
      let downvoteHandler = () => {
        this.updateLocationVote(location.id, false)
      }
      return (
        <LocationTile
          key = {location.id}
          id = {location.id}
          name = {location.name}
          address = {location.street_address}
          user_id = {location.user_id}
          event_id = {location.event_id}
          city = {location.city}
          state = {location.state}
          description = {location.description}
          votes = {location.vote_count}
          upvoteHandler = {upvoteHandler}
          downvoteHandler = {downvoteHandler}
        />
      )
    })

    return(
      <div>
        {locations}
        <NewLocationForm
          className = {className}
          handleLocationFormButtonClick = {this.handleLocationFormButtonClick}
          nameValue = {this.state.name}
          descriptionValue = {this.state.description}
          addressValue = {this.state.address}
          cityValue = {this.state.city}
          stateValue = {this.state.state}

          nameChange = {this.handleNameChange}
          descriptionChange = {this.handleDescriptionChange}
          addressChange = {this.handleAddressChange}
          cityChange = {this.handleCityChange}
          stateChange = {this.handleStateChange}

          handleSubmit = {this.handleSubmit}
        />
      </div>
    )
  }
}

export default AllLocations;
