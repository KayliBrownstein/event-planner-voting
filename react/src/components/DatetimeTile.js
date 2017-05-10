import React, { Component } from 'react';

class DatetimeTile extends Component {
  constructor(props){
    super(props);
    this.state = {
      datetime_id: this.props.id,
      voteCount: this.props.voteCount,
      date: this.props.date,
      time: this.props.time
    };
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  handleUpVote(upvote){
    let votePayload = {
      datetime_vote: {
        upvote: true
      }
    }
    fetch(`/api/v1/datetimevotes/${this.state.datetime_id}/`, {
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
      datetime_vote: {
        upvote: false
      }
    }
    fetch(`/api/v1/datetimevotes/${this.state.datetime_id}/`, {
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
    let eventEndedclassName;
    if (this.props.eventEnded == false){
      eventEndedclassName = 'show';
    } else {
      eventEndedclassName = 'hidden';
    }
    return(
      <div className="small-12 medium-6 large-3 columns location-tile">
        <div className='datetime-box-content'>
        <div className={eventEndedclassName}>
        <center><span><button className="button thumbs-down-button" onClick={this.handleDownVote}><i className="fa fa-thumbs-down" aria-hidden="true"></i></button></span><span className="vote-count">{this.state.voteCount}</span><span><button className="button thumbs-up-button" onClick={this.handleUpVote}><i className="fa fa-thumbs-up" aria-hidden="true"></i></button></span></center>
        </div>
          <h4 className='date-display'>{this.state.date}</h4>
          <h4 className='time-display'>{this.state.time}</h4>
        </div>
      </div>
    )
  }
}

export default DatetimeTile;
