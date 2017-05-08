import React, { Component } from 'react';
import DatetimeTile from './DatetimeTile';
import NewDatetimeForm from './NewDatetimeForm';

class AllDatetimes extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.updateDatetimeVote = this.updateDatetimeVote.bind(this);
  }

  updateDatetimeVote(datetime_id, upvote){
    let votePayload = {
      datetime_vote: {
        upvote: upvote
      }
    }
    let eventId = this.props.id;
    let datetimeId = datetime_id;

    fetch(`/api/v1/events/${eventId}/datetimes/${datetimeId}`, {
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
      this.getDatetimeVote(datetime_id);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getDatetimeVote(datetime_id){
    let eventId = this.props.id;
    let datetimeId = datetime_id;

    fetch(`/api/v1/events/${eventId}/datetimes/${datetimeId}`, {
      credentials: 'same-origin',
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ votes: responseData.datetime_votes })
    })
  }

  // handleDatetimeFormButtonClick(){
  //   if (this.state.formToggle == false) {
  //     this.setState({
  //       formToggle: true,
  //     })
  //   } else {
  //     this.setState({
  //       formToggle: false,
  //     })
  //   }
  // }
  //
  // handleDateChange(event){
  //   this.setState({ date: event.target.value })
  // }
  //
  // handleTimeChange(event){
  //   this.setState({ time: event.target.value })
  // }

  render(){

    let datetimes = this.props.datetimes.map((datetime) => {
      let upvoteHandler = () => {
        this.updateDatetimeVote(datetime.id, true)
      }
      let downvoteHandler = () => {
        this.updateDatetimeVote(datetime.id, false)
      }
      return (
        <DatetimeTile
          key = {datetime.id}
          id = {datetime.id}
          date = {datetime.date}
          time = {datetime.time}
          user_id = {datetime.user_id}
          event_id = {datetime.event_id}
          votes = {datetime.vote_count}
          upvoteHandler = {upvoteHandler}
          downvoteHandler = {downvoteHandler}
        />
      )
    })

    return(
      <div className='column row centered'>
      <div className='small-12 medium-12 large-10 large-centered columns'>
      <br />
      <h1 className='datetimes-title'>Dates and Times</h1>
      {datetimes}
        <NewDatetimeForm
          className = {this.props.className}
          handleDatetimeFormButtonClick = {this.props.handleDatetimeFormButtonClick}
          dateValue = {this.props.date}
          timeValue = {this.props.time}

          dateChange = {this.props.handleDateChange}
          timeChange = {this.props.handleTimeChange}

          handleDatetimeSubmit = {this.props.handleDatetimeSubmit}
        />
      </div>
      </div>
    )
  }
}

export default AllDatetimes;
