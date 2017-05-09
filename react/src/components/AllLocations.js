import React, { Component } from 'react';
import LocationTile from './LocationTile';
import NewLocationForm from './NewLocationForm';

class AllLocations extends Component {
  constructor(props){
    super(props);
    this.state = {
      locations: []
    };
    this.updateLocationVote = this.updateLocationVote.bind(this);
  }

  componentDidMount(){
    fetch(`/api/v1/events/${this.props.id}/locations`, {credentials: 'same-origin'})
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
        locations: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  updateLocationVote(location_id, upvote){
    let votePayload = {
      location_vote: {
        upvote: upvote
      }
    }

    fetch(`/api/v1/events/${this.props.id}/locations/${location_id}`, {
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
      debugger;
      this.setState({
        locations: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
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
          voteCount = {location.vote_count}
          upvoteHandler = {upvoteHandler}
          downvoteHandler = {downvoteHandler}
        />
      )
    })

    return(
      <div className='column row centered'>
      <div className='small-12 medium-12 large-10 large-centered columns'>
      <br />
      <h1 className='locations-title'>Locations</h1>
      {locations}
        <NewLocationForm
          className = {this.props.className}
          handleLocationFormButtonClick = {this.props.handleLocationFormButtonClick}
          nameValue = {this.props.name}
          descriptionValue = {this.props.description}
          addressValue = {this.props.street_address}
          cityValue = {this.props.city}
          stateValue = {this.props.state}

          nameChange = {this.props.handleNameChange}
          descriptionChange = {this.props.handleDescriptionChange}
          addressChange = {this.props.handleAddressChange}
          cityChange = {this.props.handleCityChange}
          stateChange = {this.props.handleStateChange}

          handleLocationSubmit = {this.props.handleLocationSubmit}
        />
      </div>
      </div>
    )
  }
}

export default AllLocations;
