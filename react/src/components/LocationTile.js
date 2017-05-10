import React, { Component } from 'react';

class LocationTile extends Component {
  constructor(props){
    super(props);
    this.state = {
      location_id: this.props.id,
      voteCount: this.props.voteCount,
      name: this.props.name,
      address: this.props.address,
      city: this.props.city,
      state: this.props.state,
      description: this.props.description
    };
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  handleUpVote(upvote){
    let votePayload = {
      location_vote: {
        upvote: true
      }
    };
    fetch(`/api/v1/locationvotes/${this.state.location_id}/`, {
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
        voteCount: body
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleDownVote(downvote){
    let votePayload = {
      location_vote: {
        upvote: false
      }
    };
    fetch(`/api/v1/locationvotes/${this.state.location_id}/`, {
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
        voteCount: body
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    return(
      <div className="small-12 medium-6 large-4 columns location-tile">
        <div className='location-box-content'>
          <center><h4 className='location-title'>{this.state.name}</h4></center>
          <center><span><button className="button thumbs-down-button" onClick={this.handleDownVote}><i className="fa fa-thumbs-down" aria-hidden="true"></i></button></span><span className="vote-count">{this.state.voteCount}</span><span><button className="button thumbs-up-button" onClick={this.handleUpVote}><i className="fa fa-thumbs-up" aria-hidden="true"></i></button></span></center>
          <p>{this.state.description}</p>
          <p>{this.state.address}</p>
          <p>{this.state.city}, {this.state.state}</p>
        </div>
      </div>
    )
  }
}

export default LocationTile;
