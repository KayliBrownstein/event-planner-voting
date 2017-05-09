import React, { Component } from 'react';

class LocationTile extends Component {
  constructor(props){
    super(props);
    this.state = {
      voteCount: this.props.voteCount
    };
  }

  render(){
    return(
      <div className="small-12 medium-6 large-4 columns location-tile">
        <div className='location-box-content'>
          <center><h4 className='location-title'>{this.props.name}</h4></center>
          <center><span><button className="button thumbs-down-button" onClick={this.props.downvoteHandler}><i className="fa fa-thumbs-down" aria-hidden="true"></i></button></span><span className="vote-count">{this.props.voteCount}</span><span><button className="button thumbs-up-button" onClick={this.props.upvoteHandler}><i className="fa fa-thumbs-up" aria-hidden="true"></i></button></span></center>
          <p>{this.props.description}</p>
          <p>{this.props.address}</p>
          <p>{this.props.city}, {this.props.state}</p>
        </div>
      </div>
    )
  }
}

export default LocationTile;
