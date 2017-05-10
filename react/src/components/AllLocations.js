import React, { Component } from 'react';
import LocationTile from './LocationTile';
import NewLocationForm from './NewLocationForm';

class AllLocations extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){

    let locations = this.props.locations.map((location) => {
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
          eventEnded = {this.props.eventEnded}
        />
      )
    })

    let eventEndedclassName;
    if (this.props.eventEnded == false){
      eventEndedclassName = 'show';
    } else {
      eventEndedclassName = 'hidden';
    }

    return(
      <div className='column row centered'>
      <div className='small-12 medium-12 large-12 large-centered columns'>
      <br />
      <h1 className='locations-title'>Locations</h1>
      {locations}
      <div className={eventEndedclassName}>
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
      </div>
    )
  }
}

export default AllLocations;
