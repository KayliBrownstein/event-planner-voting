import React, { Component } from 'react';

class LocationTile extends Component {
  constructor(props){
    super(props);
    this.state = {
      voteCount: this.props.votes,
    };
    this.updateLocationVote = this.updateLocationVote.bind(this);
  }

  // componentDidMount(){
  //   this.getLocationVote();
  // }

  // getLocationVote(location_id){
  //   let eventId = this.props.event_id;
  //   let locationId = location_id;
  //
  //   fetch(`/api/v1/events/${eventId}/locations/${locationId}`, {
  //     credentials: 'same-origin',
  //     method: 'GET'
  //   })
  //   .then(response => response.json())
  //   .then(responseData => {
  //     this.setState({ voteCount: responseData.location_votes })
  //   })
  //   .catch(error => console.error(`Error in fetch: ${error.message}`));
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
        locations: body.locations;
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render(){
    return(
      <div className="small-12 medium-6 large-4 columns location-tile">
        <div className='location-box-content'>
          <center><h4 className='location-title'>{this.props.name}</h4></center>
          <center><span><button className="button thumbs-down-button" onClick={this.props.downvoteHandler}><i className="fa fa-thumbs-down" aria-hidden="true"></i></button></span><span className="vote-count">{this.state.voteCount}</span><span><button className="button thumbs-up-button" onClick={this.props.upvoteHandler}><i className="fa fa-thumbs-up" aria-hidden="true"></i></button></span></center>
          <p>{this.props.description}</p>
          <p>{this.props.address}</p>
          <p>{this.props.city}, {this.props.state}</p>
        </div>
      </div>
    )
  }
}

export default LocationTile;
